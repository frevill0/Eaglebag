import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../middlewares/autenticacion.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';
import { validateEmail, validatePassword, validateUsername, validateCodigoColaborador } from '../utils/validations.js';
import { ROLES } from '../middlewares/autenticacion.js';
import jwt from 'jsonwebtoken';

// Crear una única instancia de PrismaClient
const prisma = new PrismaClient();

// Agregar manejo de errores en la inicialización
prisma.$connect()
  .then(() => console.log('Base de datos conectada exitosamente'))
  .catch((error) => console.error('Error conectando a la base de datos:', error));

// Login de usuario
const iniciarSesion = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!nombre_usuario) errores.nombre_usuario = ERROR_MESSAGES.REQUIRED_FIELDS.nombre_usuario;
    if (!contrasena) errores.contrasena = ERROR_MESSAGES.REQUIRED_FIELDS.contrasena;

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        detalles: errores,
        ayuda: 'Por favor, completa todos los campos obligatorios'
      });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { nombre_usuario: nombre_usuario }
    });

    if (!usuario) {
      return res.status(401).json({ 
        error: ERROR_MESSAGES.AUTH.invalid_credentials,
        ayuda: 'Verifica que el usuario y la contraseña sean correctos'
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
        ayuda: 'Verifica que el usuario y la contraseña sean correctos'
      });
    }

    const token = jwt.sign(
      {
        codigo_colaborador: usuario.codigo_colaborador.toString(),
        nombre_usuario: usuario.nombre_usuario,
        rol: usuario.rol.toLowerCase(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        codigo_colaborador: usuario.codigo_colaborador.toString(),
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol.toLowerCase(),
        estado: usuario.estado
      },
      mensaje: '¡Bienvenido de nuevo!'
    });
  } catch (error) {
    console.error('Error en iniciarSesion:', error);
    res.status(500).json({ 
      error: 'Error en el inicio de sesión',
      mensaje: 'Ocurrió un error inesperado',
      ayuda: 'Por favor, intenta nuevamente más tarde'
    });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError) {
      console.error('Error de conexión a la base de datos:', dbError);
      return res.status(503).json({
        error: 'Error de conexión',
        mensaje: 'No se pudo conectar a la base de datos',
        ayuda: 'Por favor, intenta más tarde'
      });
    }

    const {
      codigo_colaborador,
      nombre_usuario,
      correo,
      contrasena,
      rol
    } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!codigo_colaborador) errores.codigo_colaborador = ERROR_MESSAGES.REQUIRED_FIELDS.codigo_colaborador;
    if (!nombre_usuario) errores.nombre_usuario = ERROR_MESSAGES.REQUIRED_FIELDS.nombre_usuario;
    if (!correo) errores.correo = ERROR_MESSAGES.REQUIRED_FIELDS.correo;
    if (!contrasena) errores.contrasena = ERROR_MESSAGES.REQUIRED_FIELDS.contrasena;
    if (!rol) errores.rol = ERROR_MESSAGES.REQUIRED_FIELDS.rol;

    // Validación de formatos con mensajes específicos
    if (codigo_colaborador && !validateCodigoColaborador(codigo_colaborador)) {
      errores.codigo_colaborador = 'El código debe ser un número positivo';
    }
    if (nombre_usuario && !validateUsername(nombre_usuario)) {
      errores.nombre_usuario = 'El nombre de usuario debe tener entre 3 y 50 caracteres y solo puede contener letras, números, guiones y guiones bajos';
    }
    if (correo && !validateEmail(correo)) {
      errores.correo = 'El correo electrónico no tiene un formato válido';
    }
    if (contrasena && !validatePassword(contrasena)) {
      errores.contrasena = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&#._-)';
    }
    if (!rol || !Object.values(ROLES).includes(rol.toLowerCase())) {
      errores.rol = `Rol no válido. Roles permitidos: ${Object.values(ROLES).join(', ')}`;
    }

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Validación fallida',
        detalles: errores,
        ayuda: 'Por favor, corrige los campos señalados'
      });
    }

    // Verificar duplicados
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

    const { contrasena: _, ...usuarioData } = usuario;
    const usuarioResponse = {
      ...usuarioData,
      codigo_colaborador: usuarioData.codigo_colaborador.toString()
    };
    
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioResponse
    });
  } catch (error) {
    console.error('Error en crearUsuario:', error);
    res.status(500).json({ 
      error: 'Error al crear el usuario',
      mensaje: 'Ocurrió un error interno',
      ayuda: 'Por favor, intenta nuevamente más tarde',
      detalles: error.message
    });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { codigo_colaborador } = req.params;
    const { nombre_usuario, correo, contrasena, rol, estado } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { codigo_colaborador: BigInt(codigo_colaborador) }
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Construir objeto de actualización
    const datosActualizacion = {
      nombre_usuario,
      correo,
      rol,
      estado: parseInt(estado)
    };

    // Si se proporciona contraseña, hashearla
    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      datosActualizacion.contrasena = await bcrypt.hash(contrasena, salt);
    }

    // Actualizar usuario
    const usuarioActualizado = await prisma.usuarios.update({
      where: { codigo_colaborador: BigInt(codigo_colaborador) },
      data: datosActualizacion
    });

    // Formatear la respuesta para manejar el BigInt
    const usuarioFormateado = {
      ...usuarioActualizado,
      codigo_colaborador: usuarioActualizado.codigo_colaborador.toString(),
      contrasena: undefined // Eliminamos la contraseña de la respuesta
    };

    res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: usuarioFormateado
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ 
      error: 'Error al actualizar el usuario',
      detalle: error.message 
    });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
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

    // Convertir BigInt a string antes de enviar la respuesta
    const usuariosFormateados = usuarios.map(usuario => ({
      ...usuario,
      codigo_colaborador: usuario.codigo_colaborador.toString()
    }));

    res.json(usuariosFormateados);
  } catch (error) {
    console.error('Error en obtenerUsuarios:', error);
    res.status(500).json({ 
      error: 'Error al obtener usuarios',
      mensaje: 'Ocurrió un error interno',
      ayuda: 'Por favor, intenta nuevamente más tarde',
      detalles: error.message
    });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
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

const eliminarUsuario = async (req, res) => {
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
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion
};
