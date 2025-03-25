import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardIcon from "@mui/icons-material/DashboardCustomize";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios";
import "../styles/Dashboard.css";
import "./Login";

const Dashboard = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate(); // Hook para la redirección

  // useEffect(() => {
  //   const token = localStorage.getItem('token'); // Verifica si el token existe

  //   if (!token) {
  //     setIsAuthenticated(false); // Si no hay token, redirige al login
  //     navigate('/login'); // Redirige al login
  //   } else {

  //     axios.get('http://localhost:3001/usuarios/dashboard', {headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then(() => {
  //       setIsAuthenticated(true); // Si el token es válido, el usuario está autenticado
  //     })
  //     .catch(() => {
  //       setIsAuthenticated(false); // Si la verificación falla, desautentica al usuario
  //       navigate('/login'); // Redirige al login si la verificación falla
  //     });
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
    navigate('/login'); // Redirigir al login
  };


  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <h4>Panel Administrativo</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <DashboardIcon className="dashboard-icon" /> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <AccountCircleIcon className="user-icon" /> Usuario
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <SettingsIcon className="settings-icon" /> Configuración
            </a>
          </li>
        </ul>
      </div>

      {/* Contenido Principal */}
      <div className="container-fluid p-4">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand">Dashboard</span>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </nav>

        {/* Contenido */}
        <h2 className="mb-3">Gestión de Usuarios</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success">Agregar Usuario</button>
          <input type="text" className="form-control w-25" placeholder="Buscar..." />
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td> */}
                    {/* <button className="btn btn-warning btn-sm">✏️</button>
                    <button className="btn btn-danger btn-sm">🗑️</button>
                  </td>
                </tr>
              ))} */}
              <tr>
                <td>3</td>
                <td>Stiven Sánchez</td>
                <td>stiven.s@example.com</td>
                <td>Usuario</td>
                <td>
                  <button className="btn btn-warning btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Carlos Jiménez</td>
                <td>carlos@example.com</td>
                <td>Usuario</td>
                <td>
                  <button className="btn btn-warning btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;