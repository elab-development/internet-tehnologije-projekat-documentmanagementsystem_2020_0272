import React from 'react';
import './Home.css';
import { AiFillProject } from "react-icons/ai";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>A single platform for managing all your work</h1>
        <p>Automate tasks and streamline processes with an easy-to-use platform</p>
      </header>
      <section className="management-options">
        <div className="option-card">
          <div ><AiFillProject className="icon" /></div>
          <p>Project management</p>
        </div>
        <div className="option-card">
        <div ><FaTasks className="icon" /></div>
          <p>Task management</p>
        </div>
        <div className="option-card">
        <div ><FaUser className="icon" /></div>
          <p>Client projects</p>
        </div>
        <div className="option-card">
            <div ><MdOutlineBusinessCenter  className="icon" /></div>
            <p>Business operations</p>
        </div>
      </section>
      <footer className="footer">
        <button className="get-started">Get Started</button>
      </footer>
    </div>
  );
};

export default Home;
