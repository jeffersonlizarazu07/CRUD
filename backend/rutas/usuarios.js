import express from 'express';
import connection from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import util from 'util';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Ruta para autenticar el login
const query = util.promisify(connection.query).bind(connection);

export const loginUser = async (req, res) => {
    
  try {
    const { email, user_password } = req.body;

    if (!email || !user_password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    const results = await query('SELECT * FROM usuario WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (isMatch) {

      // const token = jwt.sign({ userId: user.id, email: user.email, userPassword: user.user_password},
      //   process.env.SECRET_JWT_KEY, 
      //     { expiresIn: '1h' }
      //   );

      const token= jwt.sign({userId: user.id, email: user.email, userPassword: user.user_password},
        process.env.SECRET_JWT_KEY,
        {expiresIn:'1h'})
    
      return res.json({ message: 'Usuario autenticado', userId: user.id, token });
    } else {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

  } catch (err) {
    console.error('Error en el proceso de autenticación:', err);
    return res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};

// Resto de las rutas (crear, obtener, actualizar, eliminar usuarios)
router.get('/', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM usuario WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el usuario', error: err });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, user_password } = req.body;

  // Hashear la contraseña antes de guardarla
  bcrypt.hash(user_password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error al hashear la contraseña', error: err });
    }

    // Guardar el usuario con la contraseña hasheada
    connection.query(
      'INSERT INTO usuario (nombre, email, user_password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error al crear el usuario', error: err });
        }
        res.status(201).json({ message: 'Usuario creado', id: results.insertId });
      }
    );
  });
});

// Ruta para actualizar un usuario (actualizar la contraseña si es necesario)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, user_password } = req.body;

  console.log("ID recibido en el backend:", id);
  console.log("Datos recibidos en el backend:", req.body);

  // Validar si los campos requeridos no están vacíos
  if (!nombre || !email) {
    return res.status(400).json({ message: 'El nombre y el email son requeridos' });
  }

  let query = 'UPDATE usuario SET nombre = ?, email = ? WHERE id = ?';
  let params = [nombre, email, id];

  // Si se proporciona una nueva contraseña, hashearla antes de actualizarla
  if (user_password) {
    bcrypt.hash(user_password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error al hashear la contraseña', error: err });
      }

      // Si hay una nueva contraseña, actualizarla en la consulta SQL
      query = 'UPDATE usuario SET nombre = ?, email = ?, user_password = ? WHERE id = ?';
      params.push(hashedPassword);

      // Ejecutar la consulta de actualización
      connection.query(query, params, (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          return res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
        }

        // Verificar si alguna fila fue afectada
        if (results.affectedRows > 0) {
          return res.json({ message: 'Usuario actualizado correctamente' });
        } else {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
      });
    });
  } else {
    // Si no hay nueva contraseña, solo actualizar nombre y email
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
      }

      // Verificar si alguna fila fue afectada
      if (results.affectedRows > 0) {
        return res.json({ message: 'Usuario actualizado correctamente' });
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    });
  }
});


// Ruta para eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuario WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

export default router;