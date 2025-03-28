import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RutasProtegidas from "./RutasProtegidas.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Ruta protegida */}
      <Route element={<RutasProtegidas />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

const Main = () => (
  <Router>
    <AppRoutes />
  </Router>
);

const root = document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
