import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Signup from './signup.jsx';
import './navbar.css';

function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>×</button>
        <Signup initialMode={isLoginMode ? 'login' : 'register'} />
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
            {/* Temporalmente comentados hasta implementar estas secciones
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
            */}
          </div>
        </nav>

        <div className="auth-buttons">
          <button className="btn-login" onClick={() => openModal(true)}>
            <svg className="icon-person" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Iniciar Sesión
          </button>
          <button className="btn-register" onClick={() => openModal(false)}>
            Registrarse
          </button>
        </div>
      </div>
      {showModal && createPortal(modalContent, document.body)}
    </header>
  );
}

export default Navbar;


