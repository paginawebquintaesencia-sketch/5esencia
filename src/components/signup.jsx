import React from 'react';
import './signup.css';

const Signup = () => {

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="signup-container">
      
      <div className="signup-logo">
        5<span>.</span>
      </div>

      <h2>Bienvenido a Quintaesencia</h2>

      <p className="login-link">
        ¿Ya tienes una cuenta? <a href="#">Iniciar sesión</a>
      </p>

      <form className="signup-form">
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">Nombre (s)</label>
            <input type="text" id="firstName" />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Apellidos</label>
            <input type="text" id="lastName" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" />
        </div>

        <div className="input-group">
          <label>Fecha de Nacimiento</label>
          <div className="form-row">
            <select defaultValue="">
              <option value="" disabled>Seleccione</option>
              {days.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
            <select defaultValue="">
              <option value="" disabled>Seleccione</option>
              {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
            </select>
            <select defaultValue="">
              <option value="" disabled>Seleccione</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" />
        </div>

        <button type="submit" className="signup-button">
          Registrarse
        </button>
        
      </form>
    </div>
  );
}

export default Signup;