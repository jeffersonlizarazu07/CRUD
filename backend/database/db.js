import mysql from 'mysql2';
import express from 'express';
const app = express();

// Configuración de Express para manejar peticiones con body en formato JSON
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',    // Dirección del servidor MySQL
  user: 'root',         // Tu usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'crud tp', //Nombre de la base de datos
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para obtener datos de la base de datos
app.get('/data', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {  
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
});

export default db;