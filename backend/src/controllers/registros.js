import { PrismaClient } from '@prisma/client';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';

const prisma = new PrismaClient();

const crearRegistro = async (req, res) => {
  try {
    const {
      tipo,
      id_talega,
      observaciones
    } = req.body;

    // Validación de campos requeridos
    const errores = {};
    if (!tipo) errores.tipo = 'El tipo de registro es requerido';
    if (!id_talega) errores.id_talega = 'El ID de la talega es requerido';

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        detalles: errores
      });
    }

    // Verificar que la talega existe y su estado actual
    const talegaExistente = await prisma.talegas.findUnique({
      where: { id_talega: BigInt(id_talega) }
    });

    if (!talegaExistente) {
      return res.status(404).json({
        error: 'Talega no encontrada'
      });
    }

    // Validar que el tipo de registro sea coherente con el estado actual
    if (tipo === 'entrada' && talegaExistente.estado === 1) {
      return res.status(400).json({
        error: 'La talega ya está registrada como entrada'
      });
    }

    if (tipo === 'salida' && talegaExistente.estado === 0) {
      return res.status(400).json({
        error: 'La talega ya está registrada como salida'
      });
    }

    // Crear el registro
    const registro = await prisma.registros.create({
      data: {
        tipo_registro: tipo,
        id_talega: BigInt(id_talega),
        observaciones: observaciones || '',
        fecha_registro: new Date(),
        id_usuario: BigInt(req.usuario.id_usuario)
      }
    });

    // Actualizar el estado de la talega
    await prisma.talegas.update({
      where: { id_talega: BigInt(id_talega) },
      data: {
        estado: tipo === 'entrada' ? 1 : 0
      }
    });

    res.status(201).json({
      mensaje: `Registro de ${tipo} creado exitosamente`,
      registro: {
        ...registro,
        id_registro: registro.id_registro.toString(),
        id_talega: registro.id_talega.toString(),
        id_usuario: registro.id_usuario.toString()
      }
    });

  } catch (error) {
    console.error('Error al crear registro:', error);
    res.status(500).json({
      error: 'Error al crear el registro',
      detalle: error.message
    });
  }
};

export {
  crearRegistro
}; 