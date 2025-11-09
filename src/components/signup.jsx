import React, { useState } from 'react';
import './signup.css';
import { mapAuthError } from './authErrors';
import supabase from '../utils/supabase';

const Signup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resent, setResent] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setResent(false);
    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName,
            birth_day: birthDay,
            birth_month: birthMonth,
            birth_year: birthYear,
          },
        },
      });
      if (error) throw error;
      const hasSession = !!data?.session;
      if (data?.user) {
        if (onSignupSuccess) {
          onSignupSuccess(hasSession);
        }
        if (!hasSession) {
          setSuccess(true);
        }
      }
    } catch (err) {
      console.error('Signup error:', err?.code, err);
      setError(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
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
    <div className="signup-container">
      
      <div className="signup-logo">
        5<span>.</span>
      </div>

      <h2>Bienvenido a Quintaesencia</h2>

      <p className="login-link">
        ¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin && onSwitchToLogin(); }}>Iniciar sesión</a>
      </p>

      {error && (
        <div className="error" role="alert" style={{color:'#b00020', fontWeight:600, marginBottom: '12px'}}>
          {error}
        </div>
      )}
      {success && (
        <div className="success" role="status" style={{color:'#0a7', fontWeight:700, marginBottom: '12px'}}>
          Te enviamos un correo de confirmación a <strong>{email}</strong>. Abre el enlace para activar tu cuenta.
          <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={handleResend} disabled={loading} className="signup-button">
              {loading ? 'Enviando...' : 'Reenviar correo'}
            </button>
            {resent && <span style={{ color: '#0a7', fontWeight: 600 }}>Correo reenviado.</span>}
          </div>
        </div>
      )}

      <form className="signup-form" onSubmit={handleSubmit}>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">Nombre (s)</label>
            <input 
              type="text" 
              id="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Apellidos</label>
            <input 
              type="text" 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

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
          <label>Fecha de Nacimiento</label>
          <div className="form-row">
            <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
              <option value="" disabled>Seleccione</option>
              {days.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
            <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
              <option value="" disabled>Seleccione</option>
              {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
            </select>
            <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
              <option value="" disabled>Seleccione</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
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

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
        
      </form>
    </div>
  );
}

export default Signup;
