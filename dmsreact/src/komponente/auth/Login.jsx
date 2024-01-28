import React from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import InputField from './InputField'; 

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <FaUser />
        </div>
        <form className="login-form">
          <InputField
            label="Email Address"
            type="email"
            id="email"
            name="email"
            placeholder="Username@gmail.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            required
          />
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
