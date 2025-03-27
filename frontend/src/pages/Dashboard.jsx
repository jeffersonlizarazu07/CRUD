import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/DashboardCustomize";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios";
import "../styles/Dashboard.css";
import './ActualizarUsuario.jsx';

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const [usuarioEditado, setUsuarioEditado] = useState(null);


  useEffect(() => {
    buscarUsuarios();
  }, []);

  //Buscar usuarios
  
  const buscarUsuarios = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/usuarios/");
      console.log("Usuarios obtenidos:", data); // 🔍 Verifica que los datos se están obteniendo
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const eliminarUsuario = async (id) => {

    const confirmacion = window.confirm("¿Desea eliminar este usuario?");
    if (!confirmacion) return;

    try {
      await axios.delete(`http://localhost:3001/usuarios/${id}`); // Ajusta la URL según tu backend
      setUsuarios(usuarios.filter(usuario => usuario.id !== id)); // Filtra los usuarios eliminando el seleccionado
      window.confirm(`Usuario eliminado exitosamente`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  const actualizarUsuario = async (usuarioActualizado) => {
    if (!usuarioActualizado?.id) {
      alert("Error: No se encontró el ID del usuario.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3001/usuarios/${usuarioActualizado.id}`, 
        {
          nombre: usuarioActualizado.nombre,
          email: usuarioActualizado.email,
          
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status === 200) {
        // Actualiza la lista de usuarios en el frontend
        setUsuarios(prevUsuarios =>
          prevUsuarios.map(usuario =>
            usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
          )
        );
  
        setUsuarioEditado(null); // Cierra el formulario
        console.log(`✅ Usuario con ID ${usuarioActualizado.id} actualizado.`);
      } else {
        throw new Error("Error al actualizar el usuario en el servidor.");
      }
    } catch (error) {
      console.error("🚨 Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar el usuario. Intenta nuevamente.");
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    buscarUsuarios();
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    navigate('/login');
  };



return (
  <div className="d-flex">
    <div className="sidebar">
      <h4>Panel Administrativo</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <a className="nav-link" href="#"><DashboardIcon className="dashboard-icon" /> Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><AccountCircleIcon className="user-icon" /> Usuario</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><SettingsIcon className="settings-icon" /> Configuración</a>
        </li>
      </ul>
    </div>

    <div className="container-fluid p-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Dashboard</span>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </nav>

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
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>

                  <td>
                    {usuarioEditado?.id === usuario.id ? (
                      <input
                        type="text"
                        value={usuarioEditado.nombre}
                        onChange={(e) =>
                          setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })
                        }
                      />
                    ) : (
                      usuario.nombre
                    )}
                  </td>

                  <td>
                    {usuarioEditado?.id === usuario.id ? (
                      <input
                        type="email"
                        value={usuarioEditado.email}
                        onChange={(e) =>
                          setUsuarioEditado({ ...usuarioEditado, email: e.target.value })
                        }
                      />
                    ) : (
                      usuario.email
                    )}
                  </td>

                  <td>{usuario.rol}</td>

                  <td>
                    {usuarioEditado?.id === usuario.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => actualizarUsuario(usuarioEditado)}
                        >
                          ✅
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setUsuarioEditado(null)}
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-warning btn-sm" onClick={() => setUsuarioEditado(usuario)}>
                          ✏️
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(usuario.id)}>
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
};

  export default Dashboard;