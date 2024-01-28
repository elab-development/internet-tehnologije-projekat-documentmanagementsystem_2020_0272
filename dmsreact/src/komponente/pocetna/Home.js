import React from 'react';
import './Home.css';
import { AiFillProject } from "react-icons/ai";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import OptionCard from './OptionCard';  

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>A single platform for managing all your work</h1>
        <p>Automate tasks and streamline processes with an easy-to-use platform</p>
      </header>
      <section className="management-options">
        <OptionCard icon={<AiFillProject className="icon" />} text="Project management" />
        <OptionCard icon={<FaTasks className="icon" />} text="Task management" />
        <OptionCard icon={<FaUser className="icon" />} text="Client projects" />
        <OptionCard icon={<MdOutlineBusinessCenter className="icon" />} text="Business operations" />
      </section>
      <footer className="footer">
        <button className="get-started">Get Started</button>
      </footer>
    </div>
  );
};

export default Home;
