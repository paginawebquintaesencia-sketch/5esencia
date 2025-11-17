// src/components/EditarPerfil.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditarPerfil.css'; 
import avatarImg from '../img/logo.png';

// (Datos simulados)
const usuarioSimulado = {
  nombre: 'Ana Sofía',
  apellido: 'Herrera',
  email: 'ana.sofia@email.com',
  avatar: avatarImg,
};

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: usuarioSimulado.nombre,
    apellido: usuarioSimulado.apellido,
    email: usuarioSimulado.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando datos:", formData);
    navigate('/perfil');
  };

  return (
    <div className="editar-perfil-container">
      <form className="editar-perfil-form" onSubmit={handleSubmit}>
        <div className="editar-perfil-header">
          <img src={usuarioSimulado.avatar} alt="Avatar" className="perfil-avatar-small" />
          <h2>Editar Perfil</h2>
        </div>
        
        <p>Actualiza tu información personal. Los cambios se reflejarán en tu cuenta.</p>

        {/* --- Fila para Nombre y Apellido (con relieve) --- */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre(s)</label>
            <input
              type="text" id="nombre" name="nombre"
              value={formData.nombre} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido(s)</label>
            <input
              type="text" id="apellido" name="apellido"
              value={formData.apellido} onChange={handleChange} required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email" id="email" name="email"
            value={formData.email} onChange={handleChange} required
          />
        </div>

        {/* --- CAMBIO: NUEVO INPUT DE ARCHIVO (BANNER) --- */}
        <div className="form-group">
          <label>Cambiar banner</label>
          <div className="file-upload-wrapper">
            {/* 1. El botón (es una etiqueta) */}
            <label htmlFor="banner-upload" className="file-upload-button">
              Seleccionar archivo
            </label>
            {/* 2. El texto placeholder */}
            <span className="file-upload-filename">Sin archivos seleccionados</span>
            {/* 3. El input real (oculto) */}
            <input
              type="file"
              id="banner-upload"
              name="banner"
              accept="image/*"
              className="file-upload-hidden"
            />
          </div>
        </div>
        {/* --- FIN DEL CAMBIO --- */}

        {/* --- CAMBIO: NUEVO INPUT DE ARCHIVO (AVATAR) --- */}
        <div className="form-group">
          <label>Cambiar foto de perfil</label>
          <div className="file-upload-wrapper">
            <label htmlFor="avatar-upload" className="file-upload-button">
              Seleccionar archivo
            </label>
            <span className="file-upload-filename">Sin archivos seleccionados</span>
            <input
              type="file"
              id="avatar-upload"
              name="avatar"
              accept="image/*"
              className="file-upload-hidden"
            />
          </div>
        </div>
        {/* --- FIN DEL CAMBIO --- */}

        <div className="form-actions-editar">
          <Link to="/perfil" className="btn-cancel">Cancelar</Link>
          <button type="submit" className="btn-save">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}