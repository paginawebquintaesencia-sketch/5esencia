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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const openModal = (isLogin) => {
    setIsLoginMode(isLogin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Cerrar menú al pasar a desktop
    const mq = window.matchMedia('(min-width: 1025px)');
    const handler = (e) => {
      if (e.matches) setIsMenuOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq.addListener) mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else if (mq.removeListener) mq.removeListener(handler);
    };
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  // Cerrar menú con Escape cuando está abierto
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

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
        <Link to="/" className="brand" aria-label="Inicio" onClick={() => handleClick('inicio')}>
          <img src="/logo.svg" alt="Quintaesencia" className="brand-logo" />
        </Link>
        <button
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-pressed={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="menu-icon" />
        </button>

        <nav aria-label="Principal" id="primary-navigation">
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
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

            {isMenuOpen && (
              <div className="nav-actions">
                {!user ? (
                  <>
                    <button className="btn-login" onClick={() => { setIsMenuOpen(false); openModal(true); }}>
                      Iniciar Sesión
                    </button>
                    <Link className="btn-register" to="/calendario" onClick={() => setIsMenuOpen(false)}>
                      Calendario
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="btn-register" to="/calendario" onClick={() => setIsMenuOpen(false)}>
                      Calendario
                    </Link>
                    <Link to="/perfil" className="user-info-link" onClick={() => setIsMenuOpen(false)}>
                      <img src={(user.user_metadata && (user.user_metadata.avatar_url || user.user_metadata.picture)) || avatarImg} alt="Avatar" className="nav-avatar" />
                      <div className="nav-user">
                        <div className="nav-user-name">{(user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || 'Usuario'}</div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* --- CAMBIO EN BOTONES DE AUTENTICACIÓN --- */}
        <div className="auth-buttons">
          {!user ? (
            <>
              {/* Esto se muestra si NO hay sesión */}
              <button className="btn-login" onClick={() => { setIsMenuOpen(false); openModal(true); }}>
                <svg className="icon-person" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Iniciar Sesión
              </button>
              <Link className="btn-register" to="/calendario" onClick={() => setIsMenuOpen(false)}>
                Calendario
              </Link>
            </>
          ) : (
            <>
              {/* Esto se muestra si SÍ hay sesión */}
              <Link className="btn-register" to="/calendario" onClick={() => setIsMenuOpen(false)}>
                Calendario
              </Link>
              
              {/* Enlace al perfil del usuario */}
              <Link to="/perfil" className="user-info-link" onClick={() => setIsMenuOpen(false)}>
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
      {/* Overlay para menú móvil */}
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      {showModal && createPortal(modalContent, document.body)}
    </header>
  );
}

export default Navbar;
