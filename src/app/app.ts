import express from 'express'
import router from '../routers/index';

const app = express();
// Middleware para habilitar CORS
app.use((req, res, next) => {
    // Permitir solicitudes desde cualquier origen (cambia esto según tus necesidades)
    res.header('Access-Control-Allow-Origin', '*');
    
    // Especifica los métodos HTTP permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    // Especifica las cabeceras permitidas en la solicitud
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Permitir solicitudes preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});

app.use(express.json());
app.use('/api', router);

export default app;