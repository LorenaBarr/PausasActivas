require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');

// Configuración CORS específica para resolver el error
const corsOptions = {
    origin: 'http://localhost:5173', // URL exacta de tu frontend React (Vite)
    credentials: true, // Permite el envío de credenciales (cookies, headers de auth)
    optionsSuccessStatus: 200, // Para navegadores legacy
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));