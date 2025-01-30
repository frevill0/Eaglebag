import express from 'express';
import { 
  crearSocio, 
  obtenerSocios, 
  actualizarSocio, 
  eliminarSocio 
} from '../controllers/socios.js';
import { verifyToken, isOperadorOrAdmin } from '../middlewares/autenticacion.js';

const router = express.Router();

// Rutas protegidas que requieren autenticación y rol de operador o admin
router.post('/crear', verifyToken, isOperadorOrAdmin, crearSocio);
router.get('/obtener', verifyToken, obtenerSocios);
router.put('/actualizar/:codigo_socio', verifyToken, isOperadorOrAdmin, actualizarSocio);
router.delete('/eliminar/:codigo_socio', verifyToken, isOperadorOrAdmin, eliminarSocio);

export default router; 