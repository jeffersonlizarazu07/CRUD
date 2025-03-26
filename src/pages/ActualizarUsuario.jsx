import { useState } from "react";
import './Dashboard.jsx';

const EditarUsuarioModal = ({ usuario, onClose, onSave }) => {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [email, setEmail] = useState(usuario.email);

  const handleSave = () => {
    onSave({ ...usuario, nombre, email });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Usuario</h3>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuarioModal;