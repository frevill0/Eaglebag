import express from 'express';
import { crearRegistro } from '../controllers/registros.js';
import { verifyToken, isOperadorOrAdmin } from '../middlewares/autenticacion.js';

const router = express.Router();

router.post('/crear', verifyToken, isOperadorOrAdmin, crearRegistro);

export default router; 