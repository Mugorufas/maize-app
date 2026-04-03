import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/planting" className="nav-item">Planting</Link>
          <Link to="/care" className="nav-item">Care</Link>
          <Link to="/harvest" className="nav-item">Harvest</Link>
          <Link to="/pests" className="nav-item">Pests</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
