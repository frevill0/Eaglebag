import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routerUsuarios from '../src/routes/usuarios_routes.js'
import routerSocios from '../src/routes/socios_routes.js'

const app = express();
dotenv.config();

// Agregar estos middlewares antes de las rutas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/eaglebag' , (req, res) => {
    res.send("server online, bienvenido a EagleBag")
});

app.set('port', process.env.PORT || 3000);

app.use('/eaglebag/usuarios', routerUsuarios)
app.use('/eaglebag/socios', routerSocios)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

app.use((req, res, next) => {
    res.status(404).send('Pagina no encontrada');
});


export default app;