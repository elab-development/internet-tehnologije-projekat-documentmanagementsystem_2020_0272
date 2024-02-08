import React, { useState } from 'react';
import './Register.css';
import InputField from './InputField';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  

const Register = () => {
  const [formData, setFormData] = useState({
    name: 'ana',
    email: 'anaa@gmail.com',
    password: '',
    password_confirmation: '',
    date_of_birth: '2000-01-01',
    bio: 'ana bio'
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/passwordgenerator?length=16', {
        headers: { 'X-Api-Key': 'QxMU0Daw1G4sRqVm6vPxjIB216188KMvISmtSJ1K'},
      });
      setFormData({ ...formData, password: response.data.random_password, password_confirmation: response.data.random_password });
    } catch (error) {
      console.error('Error generating password: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);  
      console.log(response.data);  
      navigate('/login');  
    } catch (error) {
      console.error(error);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
        <InputField
            label="Name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
 <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
           <button type="button" onClick={toggleShowPassword} className="show-password-button">
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <button type="button" onClick={generatePassword} className="generate-password-button">
            Generate Password
          </button>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
