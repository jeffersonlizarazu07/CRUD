import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const style = {
  position: "inherit",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // 
  bgcolor: "#f8f9fa;", // 
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px", 
};

const EditarUsuarioModal = ({ usuario, onClose, onSave }) => {
  const [nombre, setNombre] = React.useState(usuario?.nombre || "");
  const [email, setEmail] = React.useState(usuario?.email || "");

  const handleSave = () => {
    onSave({ id: usuario.id, nombre, email });
  };

  return (
    <Modal open={!!usuario} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ color: "black" }}>
          Actualizar datos de usuario
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="contained" sx={{ backgroundColor: "#ffc107", color: "red",}} onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#dc3545", color: "black",}} onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditarUsuarioModal;