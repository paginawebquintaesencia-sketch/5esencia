import React from 'react';
import AdminNav from './AdminNav';
import './AdminNav.css';

function TalleresActivos() {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Talleres activos</h1>
        <p>Listado y gestión de talleres actualmente activos.</p>
      </main>
    </div>
  );
}

export default TalleresActivos;

