import express from 'express';
import connection from '../database/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Ruta para autenticar el login
router.post('/login', (req, res) => {
  const { email, user_password } = req.body;

  if (!email || !user_password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  connection.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.log("Error al verificar el usuario", err)
      return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
    }

    if (results.length > 0) {
      const user = results[0];

      console.log('Contraseña ingresada:', user_password);  // Contraseña ingresada por el usuario
      console.log('Contraseña almacenada en la base de datos:', user.user_password);  // Contraseña hasheada en la base de datos

      bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
        if (err) { 
          console.log("Error al comparar contraseñas", err)
          return res.status(500).json({ message: 'Error al verificar la contraseña', error: err });
        }

        if (isMatch) {
          res.json({ message: 'Usuario autenticado', userId: user.id });
        } else {
          res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

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