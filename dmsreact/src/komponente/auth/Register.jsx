import React, { useState } from 'react';
import './Register.css';
import InputField from './InputField';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  

const Register = () => {
  const [formData, setFormData] = useState({
    name: 'ana',
    email: 'anaa@gmail.com',
    password: 'anaana1234',
    password_confirmation: 'anaana1234',
    date_of_birth: '2000-01-01',
    bio: 'ana bio'
  });

  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="password_confirmation"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <InputField
            label="Date of Birth"
            type="date"
            id="dateOfBirth"
            name="date_of_birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          <InputField
            label="Bio"
            type="textarea"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
