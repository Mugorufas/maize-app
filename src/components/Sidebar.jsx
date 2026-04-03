import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="search-box">
        <input type="text" placeholder="Search maize farming tips..." />
      </div>
      <div className="nav-menu">
        <div className="menu-item active">Introduction</div>
        <div className="menu-item">Soil Preparation</div>
        <div className="menu-item">Irrigation Methods</div>
      </div>
    </div>
  );
}

export default Sidebar;
