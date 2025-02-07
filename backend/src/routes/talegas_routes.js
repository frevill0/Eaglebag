import express from 'express';
import { 
  crearTalega, 
  obtenerTalegas, 
  actualizarTalega, 
  eliminarTalega 
} from '../controllers/talegas.js';
import { verifyToken, isOperadorOrAdmin } from '../middlewares/autenticacion.js';

const router = express.Router();

// Rutas protegidas que requieren autenticación y rol de operador o admin
router.post('/crear', verifyToken, isOperadorOrAdmin, crearTalega);
router.get('/obtener', verifyToken, obtenerTalegas);
router.put('/actualizar/:id_talega', verifyToken, isOperadorOrAdmin, actualizarTalega);
router.delete('/eliminar/:id_talega', verifyToken, isOperadorOrAdmin, eliminarTalega);

export default router; 