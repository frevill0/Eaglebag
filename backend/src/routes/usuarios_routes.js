import express from 'express';
import { loginUsuario, createUsuario, deleteUsuario, updateUsuario, getUsuarios } from '../controllers/usuarios.js';
import { verifyToken } from '../middlewares/autenticacion.js';

const router = express.Router();

router.post('/login', loginUsuario);
router.post('/create', verifyToken, createUsuario);
router.delete('/delete/:id', verifyToken, deleteUsuario);
router.put('/update/:id', verifyToken, updateUsuario);
router.get('/get', verifyToken, getUsuarios);

export default router;

