import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import './Dashboard.jsx'
import '../styles/Register.css'; // Correcto
import Login from './Login.jsx';


const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Datos enviados al backend", {nombre, email, user_password});
    
    
    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', { nombre, email, user_password }, { withCredentials: true });

      console.log(response.data);
      
      //Redirigir al login si el registro fue exitoso

      if (response.status >= 200 && response.status < 300) {  // Verifica que el estado sea 200
        
        console.log(response.status);

        return navigate('/login');
      }
 
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrarse. Intente nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center mb-4">Registro</h3>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group mb-2">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;