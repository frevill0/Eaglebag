import { PrismaClient } from '@prisma/client';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';
import { validateEmail, validatePhoneNumber, validateCedula } from '../utils/validations.js';

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('Base de datos conectada exitosamente'))
  .catch((error) => console.error('Error conectando a la base de datos:', error));

// Crear un nuevo socio
const crearSocio = async (req, res) => {
  try {
    const {
      codigo_socio,
      nombres_completos,
      cedula,
      correo,
      telefono,
      direccion
    } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!codigo_socio) errores.codigo_socio = ERROR_MESSAGES.REQUIRED_FIELDS.codigo_socio;
    if (!nombres_completos) errores.nombres_completos = ERROR_MESSAGES.REQUIRED_FIELDS.nombres_completos;
    if (!cedula) errores.cedula = ERROR_MESSAGES.REQUIRED_FIELDS.cedula;
    if (!correo) errores.correo = ERROR_MESSAGES.REQUIRED_FIELDS.correo;

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        detalles: errores,
        ayuda: 'Por favor, completa todos los campos obligatorios'
      });
    }

    // Validaciones de formato
    if (correo && !validateEmail(correo)) {
      errores.correo = ERROR_MESSAGES.INVALID_FORMAT.correo;
    }
    if (telefono && !validatePhoneNumber(telefono)) {
      errores.telefono = ERROR_MESSAGES.INVALID_FORMAT.telefono;
    }
    if (cedula && !validateCedula(cedula)) {
      errores.cedula = ERROR_MESSAGES.INVALID_FORMAT.cedula;
    }

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Validación fallida',
        detalles: errores,
        ayuda: 'Por favor, corrige los campos señalados'
      });
    }

    // Verificar duplicados
    const [existingCodigo, existingCedula, existingEmail] = await Promise.all([
      prisma.socios.findUnique({ where: { codigo_socio: BigInt(codigo_socio) } }),
      prisma.socios.findUnique({ where: { cedula } }),
      prisma.socios.findUnique({ where: { correo: correo.toLowerCase() } })
    ]);

    if (existingCodigo || existingCedula || existingEmail) {
      const duplicados = {};
      if (existingCodigo) duplicados.codigo_socio = ERROR_MESSAGES.DUPLICATE.codigo_socio;
      if (existingCedula) duplicados.cedula = ERROR_MESSAGES.DUPLICATE.cedula;
      if (existingEmail) duplicados.correo = ERROR_MESSAGES.DUPLICATE.correo_socio;

      return res.status(400).json({
        error: 'Datos duplicados',
        detalles: duplicados,
        ayuda: 'Por favor, utiliza datos únicos'
      });
    }

    // Crear el socio
    const socio = await prisma.socios.create({
      data: {
        codigo_socio: BigInt(codigo_socio),
        nombres_completos,
        cedula,
        correo: correo.toLowerCase(),
        telefono,
        direccion,
        estado: 1,
        fecha_registro: new Date()
      }
    });

    const socioResponse = {
      ...socio,
      codigo_socio: socio.codigo_socio.toString()
    };

    res.status(201).json({
      mensaje: 'Socio creado exitosamente',
      socio: socioResponse
    });

  } catch (error) {
    console.error('Error en crearSocio:', error);
    res.status(500).json({
      error: 'Error al crear el socio',
      mensaje: 'Ocurrió un error interno',
      ayuda: 'Por favor, intenta nuevamente más tarde',
      detalles: error.message
    });
  }
};

// Obtener todos los socios
const obtenerSocios = async (req, res) => {
  try {
    const socios = await prisma.socios.findMany({
      where: {
        estado: 1
      },
      include: {
        talegas: {
          select: {
            id_talega: true,
            estado: true
          }
        }
      },
      orderBy: {
        fecha_registro: 'desc'
      }
    });

    // Transformar los BigInt a string para evitar problemas de serialización
    const sociosFormateados = socios.map(socio => ({
      ...socio,
      codigo_socio: socio.codigo_socio.toString(),
      talegas: socio.talegas.map(talega => ({
        ...talega,
        id_talega: talega.id_talega.toString()
      }))
    }));

    res.json(sociosFormateados);

  } catch (error) {
    console.error('Error al obtener socios:', error);
    res.status(500).json({
      error: 'Error al obtener los socios',
      detalle: error.message,
      ayuda: 'Por favor, intente nuevamente o contacte al administrador'
    });
  }
};

// Actualizar un socio
const actualizarSocio = async (req, res) => {
  try {
    const { codigo_socio } = req.params;
    const { nombres_completos, correo, telefono, direccion, estado } = req.body;

    const socioExistente = await prisma.socios.findUnique({
      where: { codigo_socio: BigInt(codigo_socio) }
    });

    if (!socioExistente) {
      return res.status(404).json({
        error: ERROR_MESSAGES.UPDATE.socio_not_found,
        ayuda: 'Verifica el código del socio'
      });
    }

    const socioActualizado = await prisma.socios.update({
      where: { codigo_socio: BigInt(codigo_socio) },
      data: {
        nombres_completos,
        correo: correo?.toLowerCase(),
        telefono,
        direccion,
        estado: estado !== undefined ? parseInt(estado) : undefined
      }
    });

    res.json({
      mensaje: 'Socio actualizado correctamente',
      socio: {
        ...socioActualizado,
        codigo_socio: socioActualizado.codigo_socio.toString()
      }
    });

  } catch (error) {
    console.error('Error al actualizar socio:', error);
    res.status(500).json({
      error: 'Error al actualizar el socio',
      detalle: error.message
    });
  }
};

// Eliminar un socio
const eliminarSocio = async (req, res) => {
  try {
    const { codigo_socio } = req.params;

    const socio = await prisma.socios.findUnique({
      where: { codigo_socio: BigInt(codigo_socio) },
      include: { talegas: true }
    });

    if (!socio) {
      return res.status(404).json({
        error: ERROR_MESSAGES.DELETE.socio_not_found,
        ayuda: 'Verifica el código del socio'
      });
    }

    if (socio.talegas.length > 0) {
      return res.status(400).json({
        error: ERROR_MESSAGES.DELETE.has_talegas,
        mensaje: 'El socio tiene talegas asociadas',
        ayuda: 'Elimina primero las talegas asociadas'
      });
    }

    await prisma.socios.delete({
      where: { codigo_socio: BigInt(codigo_socio) }
    });

    res.json({ mensaje: 'Socio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar socio:', error);
    res.status(500).json({
      error: 'Error al eliminar el socio',
      detalle: error.message
    });
  }
};

export {
  crearSocio,
  obtenerSocios,
  actualizarSocio,
  eliminarSocio
}; 