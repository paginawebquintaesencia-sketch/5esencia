import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className="login-container">
      
      <div className="login-logo">
        5<span>.</span>
      </div>

      <h2>Iniciar sesión</h2>

      <p className="register-link">
        ¿Aún no tienes cuenta? <a href="#">Regístrate</a>
      </p>

      <form className="login-form">
        
        <div className="input-group">
          <label htmlFor="username">Correo electrónico o nombre de usuario</label>
          <input type="text" id="username" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" />
        </div>

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
        
      </form>
    </div>
  );
}

export default Login;