import React from 'react';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/DashboardCustomize";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import "../styles/Dashboard.css";
import "./Login";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/Login"); // Redirige al Login
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
            <button className="btn btn-outline-danger">Cerrar Sesión</button>
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
              <tr>
                <td>1</td>
                <td>Juan Méndez</td>
                <td>juan@example.com</td>
                <td>Administrador</td>
                <td>
                  <button className="btn btn-warning btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>María López</td>
                <td>maria@example.com</td>
                <td>Usuario</td>
                <td>
                  <button className="btn btn-warning btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>
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