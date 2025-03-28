import express from 'express';
import cors from 'cors';
import usuariosRoutes from './rutas/usuarios.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

// Configuración de CORS para el frontend
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
};

dotenv.config();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json()); 

// Usar las rutas para los usuarios

//Ruta Register
app.use('/usuarios', usuariosRoutes);

app.use('/usuarios/login', usuariosRoutes);

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

