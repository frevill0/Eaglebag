import express from 'express';
import { 
  iniciarSesion, 
  crearUsuario, 
  eliminarUsuario, 
  actualizarUsuario, 
  obtenerUsuarios 
} from '../controllers/usuarios.js';
import { verifyToken, isAdmin } from '../middlewares/autenticacion.js';

const router = express.Router();

router.post('/login', iniciarSesion);
router.post('/crear', verifyToken, isAdmin, crearUsuario);
router.delete('/eliminar/:codigo_colaborador', verifyToken, isAdmin, eliminarUsuario);
router.put('/actualizar/:codigo_colaborador', verifyToken, actualizarUsuario);
router.get('/obtener', verifyToken, obtenerUsuarios);

export default router; 

