import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNav.css';

function AdminNav() {
  return (
    <nav className="admin-nav-menu">
      <NavLink 
        to="/admin/talleres" 
        className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}
      >
        Gestionar Talleres
      </NavLink>
      <NavLink 
        to="/admin/contenido" 
        className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}
      >
        Gestionar Contenido
      </NavLink>
    </nav>
  );
}

export default AdminNav;