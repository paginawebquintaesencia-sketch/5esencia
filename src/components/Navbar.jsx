// src/components/Navbar.jsx

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Signup from './signup.jsx';
import Login from './login.jsx';
import './navbar.css';
import avatarImg from '../img/logo.png';

function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useState(null);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const openModal = (isLogin) => {
    setIsLoginMode(isLogin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // --- FIN DEL CAMBIO ---
  }, []);

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>×</button>
        {isLoginMode ? (
          <Login onSwitchToSignup={() => setIsLoginMode(false)} onLoginSuccess={() => setShowModal(false)} />
        ) : (
          <Signup onSwitchToLogin={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Inicio">
          QUINTAESENCIA
        </Link>

        <nav aria-label="Principal">
          <div className="nav-links">
            <Link 
              className={`nav-link ${activeLink === 'inicio' ? 'active' : ''}`} 
              to="/" 
              onClick={() => handleClick('inicio')}
            >
              Inicio
            </Link>
            <Link 
              className={`nav-link ${activeLink === 'galeria' ? 'active' : ''}`} 
              to="/galeria" 
              onClick={() => handleClick('galeria')}
            >
              Galería
            </Link>
          <Link 
              className={`nav-link ${activeLink === 'artistas' ? 'active' : ''}`} 
              to="/artistas" 
              onClick={() => handleClick('artistas')}
            >
              Artistas
            </Link>
            <Link 
              className={`nav-link ${activeLink === 'nosotros' ? 'active' : ''}`} 
              to="/nosotros" 
              onClick={() => handleClick('nosotros')}
            >
              Nosotros
            </Link>
            <Link 
              className={`nav-link ${activeLink === 'contacto' ? 'active' : ''}`} 
              to="/contacto" 
              onClick={() => handleClick('contacto')}
            >
              Contacto
            </Link>
          </div>
        </nav>

        {/* --- CAMBIO EN BOTONES DE AUTENTICACIÓN --- */}
        <div className="auth-buttons">
          {!user ? (
            <>
              {/* Esto se muestra si NO hay sesión */}
              <button className="btn-login" onClick={() => openModal(true)}>
                <svg className="icon-person" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Iniciar Sesión
              </button>
              <Link className="btn-register" to="/calendario">
                Calendario
              </Link>
            </>
          ) : (
            <>
              {/* Esto se muestra si SÍ hay sesión */}
              <Link className="btn-register" to="/calendario">
                Calendario
              </Link>
              
              {/* Enlace al perfil del usuario */}
              <Link to="/perfil" className="user-info-link">
                <img src={(user.user_metadata && (user.user_metadata.avatar_url || user.user_metadata.picture)) || avatarImg} alt="Avatar" className="nav-avatar" />
                <div className="nav-user">
                  <div className="nav-user-name">{(user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || 'Usuario'}</div>
                </div>
              </Link>
            </>
          )}
        </div>
        {/* --- FIN DEL CAMBIO --- */}

      </div>
      {showModal && createPortal(modalContent, document.body)}
    </header>
  );
}

export default Navbar;
