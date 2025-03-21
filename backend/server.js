import express from 'express';
import cors from 'cors';
import usuariosRoutes from './rutas/usuarios.js';  // Importar las rutas de usuarios

const app = express();

// Configuración de CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
  
};

app.use(cors(corsOptions));

app.use(express.json()); 

// Usar las rutas para los usuarios
app.use('/usuarios', usuariosRoutes);  
console.log();
// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

