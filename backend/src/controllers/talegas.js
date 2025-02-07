import { PrismaClient } from '@prisma/client';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';

const prisma = new PrismaClient();

// Conectar a la base de datos
prisma.$connect()
  .then(() => console.log('Base de datos conectada exitosamente'))
  .catch((error) => console.error('Error conectando a la base de datos:', error));

// Crear una nueva talega
const crearTalega = async (req, res) => {
  try {
    const {
      codigo_socio,
      descripcion,
      marca,
      tipo_talega,
      num_palos,
      tiene_toalla,
      tiene_bolas,
      tiene_guantes,
      tiene_paraguas,
      imagen_url,
      ubicacion
    } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!codigo_socio) errores.codigo_socio = ERROR_MESSAGES.REQUIRED_FIELDS.codigo_socio;
    if (!num_palos) errores.num_palos = ERROR_MESSAGES.REQUIRED_FIELDS.num_palos;
    if (!ubicacion) errores.ubicacion = ERROR_MESSAGES.REQUIRED_FIELDS.ubicacion;

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        detalles: errores
      });
    }

    // Obtener el último id_talega
    const ultimaTalega = await prisma.talegas.findFirst({
      orderBy: {
        id_talega: 'desc'
      }
    });

    const nuevoId = ultimaTalega ? ultimaTalega.id_talega + BigInt(1) : BigInt(1);

    // Verificar que el socio existe
    const socioExistente = await prisma.socios.findUnique({
      where: { codigo_socio: BigInt(codigo_socio) }
    });

    if (!socioExistente) {
      return res.status(404).json({
        error: 'Socio no encontrado',
        ayuda: 'Verifica el código del socio'
      });
    }

    // Crear la talega con el nuevo ID
    const talega = await prisma.talegas.create({
      data: {
        id_talega: nuevoId,
        codigo_socio: BigInt(codigo_socio),
        descripcion,
        marca,
        tipo_talega,
        num_palos: parseInt(num_palos),
        tiene_toalla: tiene_toalla || false,
        tiene_bolas: tiene_bolas || false,
        tiene_guantes: tiene_guantes || false,
        tiene_paraguas: tiene_paraguas || false,
        imagen_url,
        ubicacion,
        estado: 1,
        fecha_creacion: new Date()
      },
      include: {
        socios: {
          select: {
            nombres_completos: true,
            cedula: true,
            correo: true
          }
        }
      }
    });

    const talegaResponse = {
      ...talega,
      id_talega: talega.id_talega.toString(),
      codigo_socio: talega.codigo_socio.toString(),
      socio: talega.socios
    };

    res.status(201).json({
      mensaje: 'Talega creada exitosamente',
      talega: talegaResponse
    });

  } catch (error) {
    console.error('Error en crearTalega:', error);
    res.status(500).json({
      error: 'Error al crear la talega',
      detalle: error.message
    });
  }
};

// Obtener todas las talegas
const obtenerTalegas = async (req, res) => {
  try {
    const talegas = await prisma.talegas.findMany({
      include: {
        socios: {
          select: {
            nombres_completos: true,
            cedula: true,
            correo: true
          }
        }
      }
    });

    const talegasFormateadas = talegas.map(talega => ({
      ...talega,
      id_talega: talega.id_talega.toString(),
      codigo_socio: talega.codigo_socio.toString()
    }));

    res.json(talegasFormateadas);
  } catch (error) {
    console.error('Error en obtenerTalegas:', error);
    res.status(500).json({
      error: 'Error al obtener talegas',
      mensaje: 'Ocurrió un error interno',
      ayuda: 'Por favor, intenta nuevamente más tarde',
      detalles: error.message
    });
  }
};

// Actualizar una talega
const actualizarTalega = async (req, res) => {
  try {
    const { id_talega } = req.params;
    const {
      descripcion,
      marca,
      tipo_talega,
      num_palos,
      tiene_toalla,
      tiene_bolas,
      tiene_guantes,
      tiene_paraguas,
      imagen_url,
      ubicacion,
      estado
    } = req.body;

    const talegaExistente = await prisma.talegas.findUnique({
      where: { id_talega: BigInt(id_talega) }
    });

    if (!talegaExistente) {
      return res.status(404).json({
        error: 'Talega no encontrada',
        ayuda: 'Verifica el ID de la talega'
      });
    }

    const talegaActualizada = await prisma.talegas.update({
      where: { id_talega: BigInt(id_talega) },
      data: {
        descripcion,
        marca,
        tipo_talega,
        num_palos,
        tiene_toalla,
        tiene_bolas,
        tiene_guantes,
        tiene_paraguas,
        imagen_url,
        ubicacion,
        estado: estado !== undefined ? parseInt(estado) : undefined
      }
    });

    res.json({
      mensaje: 'Talega actualizada correctamente',
      talega: {
        ...talegaActualizada,
        id_talega: talegaActualizada.id_talega.toString(),
        codigo_socio: talegaActualizada.codigo_socio.toString()
      }
    });

  } catch (error) {
    console.error('Error al actualizar talega:', error);
    res.status(500).json({
      error: 'Error al actualizar la talega',
      detalle: error.message
    });
  }
};

// Eliminar una talega
const eliminarTalega = async (req, res) => {
  try {
    const { id_talega } = req.params;

    const talega = await prisma.talegas.findUnique({
      where: { id_talega: BigInt(id_talega) }
    });

    if (!talega) {
      return res.status(404).json({
        error: 'Talega no encontrada',
        ayuda: 'Verifica el ID de la talega'
      });
    }

    await prisma.talegas.delete({
      where: { id_talega: BigInt(id_talega) }
    });

    res.json({ mensaje: 'Talega eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar talega:', error);
    res.status(500).json({
      error: 'Error al eliminar la talega',
      detalle: error.message
    });
  }
};

export {
  crearTalega,
  obtenerTalegas,
  actualizarTalega,
  eliminarTalega
}; 