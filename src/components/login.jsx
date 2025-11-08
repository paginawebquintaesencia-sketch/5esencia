import React, { useState } from 'react';
import './login.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar sesión.');
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
