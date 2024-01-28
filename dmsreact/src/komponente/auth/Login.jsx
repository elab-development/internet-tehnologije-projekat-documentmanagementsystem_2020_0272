import React, { useState } from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import InputField from './InputField';
import axios from 'axios'; 

const Login = ({setToken}) => {
  const [formData, setFormData] = useState({
    email: 'ana@gmail.com',
    password: 'anaana1234',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);  
      const { token } = response.data;
      setToken(token)
      sessionStorage.setItem('token', token);  
      console.log('Login successful');  
    
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <FaUser />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
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
