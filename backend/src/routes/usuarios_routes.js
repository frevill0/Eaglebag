import express from 'express';
import { 
  iniciarSesion, 
  crearUsuario, 
  eliminarUsuario, 
  actualizarUsuario, 
  obtenerUsuarios 
} from '../controllers/usuarios.js';
import { verifyToken } from '../middlewares/autenticacion.js';

const router = express.Router();

router.post('/login', iniciarSesion);
router.post('/crear', crearUsuario);
router.delete('/eliminar/:id', verifyToken, eliminarUsuario);
router.put('/actualizar/:id', verifyToken, actualizarUsuario);
router.get('/obtener', verifyToken, obtenerUsuarios);

export default router; 

