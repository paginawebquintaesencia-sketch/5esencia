import React, { useState } from 'react';
import './signup.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = ({ onSwitchToLogin }) => {
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
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = `${firstName} ${lastName}`.trim();
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      // Opcional: podríamos guardar birthdate en Firestore si se requiere.
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al registrarse.');
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
          Registro completado. Ya puedes iniciar sesión.
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
