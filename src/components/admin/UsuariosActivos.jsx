import React from 'react';
import AdminNav from './AdminNav';
import './AdminNav.css';

function UsuariosActivos() {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Usuarios activos</h1>
        <p>Gestión y monitoreo de usuarios con actividad.</p>
      </main>
    </div>
  );
}

export default UsuariosActivos;

