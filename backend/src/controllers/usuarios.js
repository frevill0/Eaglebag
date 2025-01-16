import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../middlewares/autenticacion.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';
import { validateEmail, validatePassword, validateUsername, validateCodigoColaborador } from '../utils/validations.js';

const prisma = new PrismaClient();

// Login de usuario
const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!correo) errores.correo = ERROR_MESSAGES.REQUIRED_FIELDS.correo;
    if (!contrasena) errores.contrasena = ERROR_MESSAGES.REQUIRED_FIELDS.contrasena;

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        detalles: errores,
        ayuda: 'Por favor, completa todos los campos obligatorios'
      });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { correo: correo.toLowerCase() }
    });

    if (!usuario) {
      return res.status(401).json({ 
        error: ERROR_MESSAGES.AUTH.invalid_credentials,
        ayuda: 'Verifica que el correo y la contraseña sean correctos'
      });
    }

    if (usuario.estado !== 1) {
      return res.status(403).json({ 
        error: ERROR_MESSAGES.AUTH.inactive_user,
        ayuda: 'Contacta al administrador para reactivar tu cuenta'
      });
    }

    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(401).json({ 
        error: ERROR_MESSAGES.AUTH.invalid_credentials,
        ayuda: 'Verifica que el correo y la contraseña sean correctos'
      });
    }

    const token = generateToken(usuario);

    res.json({
      token,
      usuario: {
        codigo_colaborador: usuario.codigo_colaborador.toString(),
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
        estado: usuario.estado
      },
      mensaje: '¡Bienvenido de nuevo!'
    });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    res.status(500).json({ 
      error: 'Error en el inicio de sesión',
      mensaje: 'Ocurrió un error inesperado',
      ayuda: 'Por favor, intenta nuevamente más tarde'
    });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const {
      codigo_colaborador,
      nombre_usuario,
      correo,
      contrasena,
      rol = 'CONSULTOR'
    } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!codigo_colaborador) errores.codigo_colaborador = ERROR_MESSAGES.REQUIRED_FIELDS.codigo_colaborador;
    if (!nombre_usuario) errores.nombre_usuario = ERROR_MESSAGES.REQUIRED_FIELDS.nombre_usuario;
    if (!correo) errores.correo = ERROR_MESSAGES.REQUIRED_FIELDS.correo;
    if (!contrasena) errores.contrasena = ERROR_MESSAGES.REQUIRED_FIELDS.contrasena;

    // Validación de formatos
    if (codigo_colaborador && !validateCodigoColaborador(codigo_colaborador)) {
      errores.codigo_colaborador = ERROR_MESSAGES.INVALID_FORMAT.codigo_colaborador;
    }
    if (nombre_usuario && !validateUsername(nombre_usuario)) {
      errores.nombre_usuario = ERROR_MESSAGES.INVALID_FORMAT.nombre_usuario;
    }
    if (correo && !validateEmail(correo)) {
      errores.correo = ERROR_MESSAGES.INVALID_FORMAT.correo;
    }
    if (contrasena && !validatePassword(contrasena)) {
      errores.contrasena = ERROR_MESSAGES.INVALID_FORMAT.contrasena;
    }

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Validación fallida',
        detalles: errores,
        ayuda: 'Por favor, corrige los campos señalados'
      });
    }


    const [existingCodigo, existingEmail, existingUsername] = await Promise.all([
      prisma.usuarios.findUnique({
        where: { codigo_colaborador: BigInt(codigo_colaborador) }
      }),
      prisma.usuarios.findUnique({
        where: { correo: correo.toLowerCase() }
      }),
      prisma.usuarios.findUnique({
        where: { nombre_usuario }
      })
    ]);

    if (existingCodigo || existingEmail || existingUsername) {
      const duplicados = {};
      if (existingCodigo) duplicados.codigo_colaborador = ERROR_MESSAGES.DUPLICATE.codigo_colaborador;
      if (existingEmail) duplicados.correo = ERROR_MESSAGES.DUPLICATE.correo;
      if (existingUsername) duplicados.nombre_usuario = ERROR_MESSAGES.DUPLICATE.nombre_usuario;

      return res.status(400).json({
        error: 'Datos duplicados',
        detalles: duplicados,
        ayuda: 'Por favor, utiliza datos únicos para el registro'
      });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    
    const usuario = await prisma.usuarios.create({
      data: {
        codigo_colaborador: BigInt(codigo_colaborador),
        nombre_usuario,
        correo: correo.toLowerCase(),
        contrasena: hashedPassword,
        rol,
        estado: 1,
        fecha_creacion: new Date()
      }
    });

    const { contrasena: _, ...usuarioSinPassword } = usuario;
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioSinPassword
    });
  } catch (error) {
    console.error('Error en createUsuario:', error);
    res.status(500).json({ 
      error: 'Error al crear el usuario',
      mensaje: 'Ocurrió un error interno',
      ayuda: 'Por favor, intenta nuevamente más tarde'
    });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  try {
    const { codigo_colaborador } = req.params;
    const {
      nombre_usuario,
      correo,
      contrasena,
      rol,
      estado
    } = req.body;

    const data = {};

    if (nombre_usuario) data.nombre_usuario = nombre_usuario;
    if (correo) data.correo = correo;
    if (rol) {
      if (!['ADMIN', 'OPERADOR', 'CONSULTOR'].includes(rol)) {
        return res.status(400).json({
          error: 'Rol no válido'
        });
      }
      data.rol = rol;
    }
    if (estado !== undefined) data.estado = estado;
    if (contrasena) {
      data.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const usuario = await prisma.usuarios.update({
      where: { codigo_colaborador: BigInt(codigo_colaborador) },
      data
    });

    const { contrasena: _, ...usuarioSinPassword } = usuario;
    res.json(usuarioSinPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        codigo_colaborador: true,
        nombre_usuario: true,
        correo: true,
        rol: true,
        estado: true,
        fecha_creacion: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { codigo_colaborador } = req.params;
    const usuario = await prisma.usuarios.findUnique({
      where: { codigo_colaborador: BigInt(codigo_colaborador) },
      select: {
        codigo_colaborador: true,
        nombre_usuario: true,
        correo: true,
        rol: true,
        estado: true,
        fecha_creacion: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { codigo_colaborador } = req.params;

    // Verificar si el usuario existe
    const usuario = await prisma.usuarios.findUnique({
      where: { codigo_colaborador: BigInt(codigo_colaborador) }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await prisma.usuarios.delete({
      where: { codigo_colaborador: BigInt(codigo_colaborador) }
    });

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

export {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
};
