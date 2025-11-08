import React from 'react';
import AdminNav from './AdminNav';
import './AdminNav.css';

function ProgramacionTalleres() {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Programación de talleres</h1>
        <p>Agenda y planificación de próximos talleres.</p>
      </main>
    </div>
  );
}

export default ProgramacionTalleres;

