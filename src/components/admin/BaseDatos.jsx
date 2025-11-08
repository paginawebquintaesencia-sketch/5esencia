import React from 'react';
import AdminNav from './AdminNav';
import './AdminNav.css';

function BaseDatos() {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Base de datos</h1>
        <p>Panel para consultar y administrar datos del sistema.</p>
      </main>
    </div>
  );
}

export default BaseDatos;

