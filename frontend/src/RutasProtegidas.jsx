import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const RutasProtegidas = () => {
  const [autenticado, setAutenticado] = useState(null);
  const [ejecutarEfecto] = useState(true);

  useEffect(() => {
    if (!ejecutarEfecto) return;

    let cancelado = false;

    const verificarAuth = async () => {
      try {
        await axios.get("http://localhost:3001/usuarios/verify", { withCredentials: true });
        if (!cancelado) setAutenticado(true);
      } catch (error) {
        if (!cancelado) {
          if (error.response?.status === 401) {
            console.warn("Sesión expirada o usuario no autenticado.");
          }
          setAutenticado(false);
        }
      }
    };

    verificarAuth();

    return () => {
      cancelado = true;
    };
  }, [ejecutarEfecto]);

  if (autenticado === null) return <p>Cargando...</p>;
  
  return autenticado ? <Outlet /> : <Navigate to="/login" />;
};

export default RutasProtegidas;
