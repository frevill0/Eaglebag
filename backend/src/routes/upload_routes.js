import express from 'express';
import { uploadImage } from '../controllers/upload.js';
import { verifyToken } from '../middlewares/autenticacion.js';

const router = express.Router();

router.post('/', verifyToken, uploadImage);

export default router;