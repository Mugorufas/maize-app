import React from 'react';
import { Link } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';
import { useAuth } from '../context/AuthContext';
import { MATURITY_TYPES } from './CropCalendar';
import './HomePage.css';

const HomePage = () => {
  const { currentUser, userData } = useAuth();
  const sections = [
    {
      id: "planting",
      title: "Seed to Sprout",
      subtitle: "Planting Guide",
      description: "Master the art of land preparation, seed selection, and precision planting.",
      link: "/planting",
      icon: "🌱"
    },
    {
      id: "care",
      title: "Growth & Vigor",
      subtitle: "Care & Maintenance",
      description: "Optimal irrigation, nutrient management, and professional weed control.",
      link: "/care",
      icon: "💧"
    },
    {
      id: "harvest",
      title: "Golden Yield",
      subtitle: "Harvesting Guide",
      description: "Identifying maturity and ensuring safety from field to silo.",
      link: "/harvest",
      icon: "🌾"
    },
    {
      id: "pests",
      title: "Crop Defense",
      subtitle: "Pest & Disease",
      description: "A proactive strategy to protect your harvest from evolving threats.",
      link: "/pests",
      icon: "🛡️"
    }
  ];

  const getCurrentStage = () => {
    if (!userData?.farmData?.plantingDate) return null;
    
    const start = new Date(userData.farmData.plantingDate);
    const maturityType = userData.farmData.maturityType || 'medium';
    const totalDays = MATURITY_TYPES[maturityType]?.duration || 130;
    const scale = totalDays / 120;
    
    const milestones = [
      { name: 'Emergence', day: 7 * scale, icon: '🌱' },
      { name: 'V6 (Knee High)', day: 35 * scale, icon: '🌿' },
      { name: 'V12 Stage', day: 55 * scale, icon: '📏' },
      { name: 'Tasseling/Silking', day: 70 * scale, icon: '🌽' },
      { name: 'Grain Filling', day: 90 * scale, icon: '🥛' },
      { name: 'Maturity', day: totalDays, icon: '🚜' }
    ];

    const today = new Date();
    const daysSincePlanting = Math.floor((today - start) / (24 * 60 * 60 * 1000));
    
    const stage = [...milestones].reverse().find(m => daysSincePlanting >= m.day);
    return stage || { name: 'Late Germination', icon: '🌱' };
  };

  const currentStage = getCurrentStage();

  return (
    <div className="home-page-container" data-readable="true">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">Professional Agriculture</span>
          <h1>Master Modern Maize Farming</h1>
          <p>A comprehensive, research-backed guide designed to empower farmers from first seed to final silo. Explore the deep-dive science of productivity.</p>
          <div className="hero-actions">
            <Link to="/planting" className="btn-primary-home">Start Planting</Link>
            <Link to="/contact" className="btn-secondary-home">Get Expert Advice</Link>
          </div>
        </div>
      </section>

       {/* NEW: Intelligence Layer (Weather & Calendar) */}
      <section className="home-intelligence">
        <div className="intelligence-grid">
           {currentUser ? (
             <div className="glass-card farm-widget">
               <h3>My Farm Dashboard</h3>
               <p>Track your crop's journey and get personalized alerts.</p>
               <div className="farm-widget-status">
                 {userData?.farmData?.plantingDate ? (
                   <div className="status-grid">
                     <div className="mini-status">
                       <span className="status-label">Planting Date</span>
                       <span className="status-value">{new Date(userData.farmData.plantingDate).toLocaleDateString()}</span>
                     </div>
                     <div className="mini-status">
                       <span className="status-label">Current Stage</span>
                       <span className="status-value highlight-stage">
                         {currentStage?.icon} {currentStage?.name}
                       </span>
                     </div>
                   </div>
                 ) : (
                   <p className="status-empty">Ready to start tracking? Set your planting date.</p>
                 )}
               </div>
               <Link to="/calendar" className="btn-dash">Open Calendar →</Link>
             </div>
           ) : (
             <WeatherWidget />
           )}
           
           <div className="intelligence-intro">
              <h2>Smart Farming Intelligence</h2>
              <p>We combine your local {currentUser ? 'farm timeline' : 'weather data'} with expert agronomy to give you the best advice for today's conditions.</p>
              <ul className="intel-list">
                <li>✅ Optimized Fertilizer Timing</li>
                <li>✅ Pest Scouting Alerts</li>
                <li>✅ Irrigation Planning</li>
              </ul>
              {!currentUser && <Link to="/signup" className="intel-link">Join 500+ Farmers →</Link>}
           </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="home-features">
        <div className="section-header">
          <h2>The Four Pillars of Productivity</h2>
          <p>Click any card to explore our detailed, research-backed technical guides.</p>
        </div>
        <div className="features-grid">
          {sections.map((section, index) => (
            <Link to={section.link} key={index} className="feature-card-premium">
              <div className="card-top-glow"></div>
              <div className="card-icon-area">{section.icon}</div>
              <div className="card-text-area">
                <span className="card-subtitle">{section.subtitle}</span>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <span className="card-link-text">Explore Deep Dive →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="why-guide">
        <div className="why-content-glass">
            <h2>Why Use This Guide?</h2>
            <div className="why-grid">
                <div className="why-item">
                    <strong>Research Backed</strong>
                    <p>All data is sourced from professional agricultural standards and field studies.</p>
                </div>
                <div className="why-item">
                    <strong>Precision Timing</strong>
                    <p>We focus on the critical windows (V6, Tasseling, Silking) for maximum yield.</p>
                </div>
                <div className="why-item">
                    <strong>Crop Safety</strong>
                    <p>Protect your grain quality from aflatoxins and pests with our defense strategy.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
