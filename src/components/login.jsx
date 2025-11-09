import React, { useState } from 'react';
import './login.css';
import { mapAuthError } from './authErrors';
import supabase from '../utils/supabase';

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data?.user) {
        onLoginSuccess && onLoginSuccess();
      }
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
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) throw error;
      setResent(true);
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
        5<span>.</span>
      </div>

      <h2>Iniciar sesión</h2>

      <p className="register-link">
        ¿Aún no tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup && onSwitchToSignup(); }}>Regístrate</a>
      </p>

      {error && (
        <div className="error" role="alert" style={{color:'#b00020', fontWeight:600, marginBottom: '12px'}}>
          {error}
        </div>
      )}
      {notConfirmed && (
        <div className="warning" role="status" style={{color:'#ff9800', fontWeight:600, marginBottom: '12px'}}>
          Tu cuenta aún no está confirmada. Revisa tu correo y confirma.
          <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={handleResend} disabled={loading} className="login-button">
              {loading ? 'Enviando...' : 'Reenviar correo'}
            </button>
            {resent && <span style={{ color: '#0a7', fontWeight: 600 }}>Correo reenviado.</span>}
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
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Iniciar sesión'}
        </button>
        
      </form>
    </div>
  );
}

export default Login;
