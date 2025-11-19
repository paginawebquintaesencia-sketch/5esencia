import React, { useState } from 'react';
import './login.css';
import { mapAuthError } from './authErrors';
// Supabase eliminado: autenticación deshabilitada

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notConfirmed, setNotConfirmed] = useState(false);
  const [resent, setResent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Autenticación deshabilitada: mostrar mensaje informativo
      setError('La autenticación está deshabilitada temporalmente.');
    } catch (err) {
      console.error('Login error:', err?.code, err);
      setError(mapAuthError(err));
      const msg = (err?.message || '').toLowerCase();
      if (msg.includes('not confirmed')) {
        setNotConfirmed(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setLoading(true);
    try {
      // Funcionalidad de reenvío deshabilitada
      setError('El reenvío de confirmación está deshabilitado.');
      setResent(false);
    } catch (err) {
      console.error('Resend error:', err?.code, err);
      setError(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      
      <div className="login-logo">
        <img src="/5cia.png" alt="Quintaesencia" className="login-logo-img" />
      </div>

      <h2>Iniciar sesión</h2>

      <p className="register-link">
        ¿Aún no tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup && onSwitchToSignup(); }}>Regístrate</a>
      </p>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      {notConfirmed && (
        <div className="warning-message" role="status">
          Tu cuenta aún no está confirmada. Revisa tu correo y confirma.
          <div className="resend-row">
            <button type="button" onClick={handleResend} disabled={loading} className="login-button">
              {loading ? 'Enviando...' : 'Reenviar correo'}
            </button>
            {resent && <span className="resend-ok">Correo reenviado.</span>}
          </div>
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        
        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading} aria-busy={loading}>
          {loading ? 'Entrando...' : 'Iniciar sesión'}
        </button>
        
      </form>
    </div>
  );
}

export default Login;
