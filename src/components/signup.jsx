import React from 'react';
import './signup.css';

function Signup() {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" />

        <div className="signup-options">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="signup-submit">Sign up</button>
      </form>

      <div className="signup-divider">Or continue with</div>

      <div className="signup-google">
        <button>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" /> Google
        </button>
      </div>
    </div>
  );
}

export default Signup;