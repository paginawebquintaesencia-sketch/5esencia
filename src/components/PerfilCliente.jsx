// src/components/PerfilCliente.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './PerfilCliente.css'; // Usaremos este CSS actualizado
import avatarImg from '../img/logo.png'; // Usamos un avatar de placeholder

// --- Datos simulados de un usuario ---
const usuarioSimulado = {
  nombre: 'Ana Sofía',
  apellido: 'Herrera',
  email: 'ana.sofia@email.com',
  fechaNacimiento: '1995-03-15',
  avatar: avatarImg,
  // ¡NUEVO! Añadimos un banner simulado
  banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  talleresInscritos: [
    { id: 1, titulo: "Pinta tu taza en cerámica", fecha: "2025-11-20" },
    { id: 2, titulo: "Introducción al dibujo", fecha: "2025-12-05" },
  ]
};
// --- Fin de datos simulados ---


export default function PerfilCliente() {
  const usuario = usuarioSimulado; // Usamos los datos simulados

  return (
    // CAMBIO: Contenedor principal
    <div className="perfil-container-twitter">
      
      {/* --- NUEVA CABECERA ESTILO TWITTER --- */}
      <header className="perfil-header-twitter">
        
        {/* 1. El Banner */}
        <div 
          className="perfil-banner" 
          style={{ backgroundImage: `url(${usuario.banner})` }}
        >
          {/* La imagen es un fondo CSS */}
        </div>
        
        {/* 2. Barra de Info (Avatar, Nombre, Botón Editar) */}
        <div className="perfil-info-bar">
          <div className="perfil-avatar-info-wrapper">
            <img src={usuario.avatar} alt="Avatar" className="perfil-avatar-twitter" />
            <div className="perfil-name-block">
              <h2 className="perfil-nombre">{usuario.nombre} {usuario.apellido}</h2>
              <p className="perfil-email">{usuario.email}</p>
            </div>
          </div>
          <Link to="/perfil/editar" className="btn-perfil-editar-twitter">
            Editar Perfil
          </Link>
        </div>

      </header>

      {/* --- CUERPO DEL PERFIL (Contenido) --- */}
      <main className="perfil-body-twitter">
        {/* Mantenemos la sección de talleres tal como estaba */}
        <div className="perfil-seccion">
          <h3>Mis Próximos Talleres</h3>
          {usuario.talleresInscritos.length > 0 ? (
            <ul className="lista-talleres-perfil">
              {usuario.talleresInscritos.map(taller => (
                <li key={taller.id} className="item-taller-perfil">
                  <span className="taller-titulo">{taller.titulo}</span>
                  <span className="taller-fecha">{taller.fecha}</span>
                  <Link to={`/inscripciones/${taller.id}`} className="taller-ver-detalle">
                    Ver Detalle
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aún no te has inscrito a ningún taller. ¡<Link to="/calendario">Explora el calendario</Link>!</p>
          )}
        </div>
      </main>
      
    </div>
  );
}