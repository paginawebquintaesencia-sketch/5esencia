import React from 'react';
import AdminNav from './AdminNav';
import './AdminNav.css';

function Calendary() {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Calendario</h1>
        <p>Aquí puedes visualizar y gestionar el calendario de talleres.</p>
      </main>
    </div>
  );
}

export default Calendary;

