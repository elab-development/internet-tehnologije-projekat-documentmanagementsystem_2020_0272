import React from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
            <FaUser></FaUser>
        </div>
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Username@gmail.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <a href="#signup">Signup</a>
          <a href="#forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
