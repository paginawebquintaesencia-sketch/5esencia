import React from 'react';
import AdminNav from './AdminNav';
import './AdminNav.css';

function Estadisticas() {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Estadísticas</h1>
        <p>Visualización de métricas y KPIs del sistema.</p>
      </main>
    </div>
  );
}

export default Estadisticas;

