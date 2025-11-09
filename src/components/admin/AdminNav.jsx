import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminNav.css';
import avatarImg from '../../img/logo.png';
import supabase from '../../utils/supabase';

function AdminNav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) setUser(data?.session?.user || null);
    };
    loadUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      navigate('/');
    }
  };
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-logo">Adminirador</div>
        <button className="admin-sidebar-action" aria-label="collapse" title="Collapse">
          {/* simple icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>
      {/* Avatar del usuario */}
      <div className="admin-avatar">
        <img src={(user?.user_metadata && (user.user_metadata.avatar_url || user.user_metadata.picture)) || avatarImg} alt="Avatar" className="admin-avatar-image" />
        <div className="admin-avatar-info">
          <div className="admin-avatar-name">{(user?.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || user?.email || 'Administrador'}</div>
          <div className="admin-avatar-role">{user ? 'Conectado' : 'Invitado'}</div>
        </div>
      </div>
      <nav className="admin-sidebar-menu">
        {/* Calendario (calendary) */}
        <NavLink
          to="/admin/calendary"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
          <span className="admin-menu-label">Calendario</span>
        </NavLink>

        {/* Talleres */}
        <NavLink
          to="/admin/talleres"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </span>
          <span className="admin-menu-label">Talleres</span>
        </NavLink>

        {/* Talleres activos */}
        <NavLink
          to="/admin/talleres-activos"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 7v5l3 3"/>
            </svg>
          </span>
          <span className="admin-menu-label">Talleres activos</span>
        </NavLink>

        {/* Programación de talleres */}
        <NavLink
          to="/admin/programacion"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M3 12h18"/>
              <path d="M3 18h18"/>
            </svg>
          </span>
          <span className="admin-menu-label">Programación</span>
        </NavLink>

        {/* Usuarios activos */}
        <NavLink
          to="/admin/usuarios-activos"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <span className="admin-menu-label">Usuarios activos</span>
        </NavLink>

        {/* Base de datos */}
        <NavLink
          to="/admin/base-datos"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
              <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>
            </svg>
          </span>
          <span className="admin-menu-label">Base de datos</span>
        </NavLink>

        {/* Estadísticas */}
        <NavLink
          to="/admin/estadisticas"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/>
              <rect x="7" y="12" width="3" height="6"/>
              <rect x="12" y="9" width="3" height="9"/>
              <rect x="17" y="5" width="3" height="13"/>
            </svg>
          </span>
          <span className="admin-menu-label">Estadísticas</span>
        </NavLink>

        {/* Contenido */}
        <NavLink
          to="/admin/contenido"
          className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="admin-menu-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15A2.5 2.5 0 0 1 17.5 22h-11A2.5 2.5 0 0 1 4 19.5Z"/>
              <path d="M8 6h8M8 10h8M8 14h5"/>
            </svg>
          </span>
          <span className="admin-menu-label">Contenido</span>
        </NavLink>
      </nav>
      {/* Footer con botón salir */}
      <div className="admin-sidebar-footer">
        <button type="button" className="admin-logout-btn" aria-label="Salir" onClick={handleLogout}>
          SALIR
        </button>
      </div>
    </aside>
  );
}

export default AdminNav;
