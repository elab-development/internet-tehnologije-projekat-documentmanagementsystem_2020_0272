import React, { useState } from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import InputField from './InputField';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Login = ({setToken}) => {
  let navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: 'pera@example.com',
    password: 'password',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);  
      const { token } = response.data;
      console.log(response.data);
      setToken(token)
      sessionStorage.setItem('token', token);  
      sessionStorage.setItem('id',response.data.user.id);
      sessionStorage.setItem('uloga',response.data.user.uloga);
      console.log('Login successful');  
      if(response.data.user.uloga=="korisnik"){
        navigate('/docs');
      }else{
        navigate('/statistike');
      }
     
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
