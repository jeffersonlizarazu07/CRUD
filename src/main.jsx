import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import Registrer from './pages/Register.jsx';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Registrer />}/>
        <Route path="/" element={<Login />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
