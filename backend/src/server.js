import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routerUsuarios from '../src/routes/usuarios_routes.js'
import routerSocios from '../src/routes/socios_routes.js'
import routerTalegas from '../src/routes/talegas_routes.js'
import routerUpload from '../src/routes/upload_routes.js'
import routerRegistros from '../src/routes/registros_routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Agregar estos middlewares antes de las rutas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar directorio de uploads como estático
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/eaglebag', (req, res) => {
    res.send("server online, bienvenido a EagleBag")
});

app.set('port', process.env.PORT || 3000);

app.use('/eaglebag/usuarios', routerUsuarios)
app.use('/eaglebag/socios', routerSocios)
app.use('/eaglebag/talegas', routerTalegas)
app.use('/eaglebag/upload', routerUpload)
app.use('/eaglebag/registros', routerRegistros)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

app.use((req, res, next) => {
    res.status(404).send('Pagina no encontrada');
});

export default app;