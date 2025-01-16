import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/' , (req, res) => {
    res.send("server online, bienvenido a EagleBag")
});

app.set('port', process.env.PORT || 3000);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

app.use((req, res, next) => {
    res.status(404).send('Pagina no encontrada');
});

export default app;