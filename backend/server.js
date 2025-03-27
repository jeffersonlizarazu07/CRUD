import express from 'express';
import cors from 'cors';
import usuariosRoutes from './rutas/usuarios.js';
import dotenv from 'dotenv';

const app = express();

// Configuración de CORS para el frontend
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
};

dotenv.config();

app.use(cors(corsOptions));

app.use(express.json()); 

// Usar las rutas para los usuarios

//Ruta Register
app.use('/usuarios', usuariosRoutes);   

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(process.env.SECRET_JWT_KEY)
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

