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
router.get('/obtener', verifyToken, isAdmin, obtenerUsuarios);
router.post('/crear', verifyToken, isAdmin, crearUsuario);
router.put('/actualizar/:codigo_colaborador', verifyToken, isAdmin, actualizarUsuario);
router.delete('/eliminar/:codigo_colaborador', verifyToken, isAdmin, eliminarUsuario);

export default router; 

