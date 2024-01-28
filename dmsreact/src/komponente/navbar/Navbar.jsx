import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ token, setToken }) => {
    let navigate= useNavigate();
    const handleLogout = async () => {
        try {
          await axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          });
    
          
          setToken(null);
          sessionStorage.clear();
          navigate('/');
        } catch (error) {
          console.error(error);
         
        }
      };

  return (
    <nav className="navbar">
      <div className="logo">
        LOGO
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {token ? (
          <li>
            <button className="nav-link" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
