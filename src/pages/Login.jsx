import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // hook para navegación

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Datos enviados al backend", {email, user_password});

    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', { email, user_password }, { withCredentials: true });

      console.log(response.data);
      
      // Redirigir al dashboard si el login es exitoso
      if (navigate === 200) {
        navigate('/dashboard');
      }
      } catch (error) {
        console.error('Error en login', error.response?.data || error.message);
        setError('Correo o contraseña incorrectos');
      }
    };

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>

        {/* Mostrar mensaje de error si existe */}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Usuario</label>
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
          <button type="submit" className="btn btn-primary btn-block w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;