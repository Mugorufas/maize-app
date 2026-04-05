import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <div className="top-bar">
        <span>Maize Farming</span>
        <div className="top-icons">
          <span className="icon">💬</span>
          <span className="icon">🛡️</span>
          <span className="icon">🎤</span>
        </div>
      </div>
      <div className="hero-section">
        <h1>Maize Farming Guide</h1>
        <div className="nav-pill">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>Home</NavLink>
          <NavLink to="/planting" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Planting</NavLink>
          <NavLink to="/care" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Care</NavLink>
          <NavLink to="/harvest" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Harvest</NavLink>
          <NavLink to="/pests" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Pests</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Contact</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
