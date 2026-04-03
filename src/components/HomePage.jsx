import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
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

  return (
    <div className="home-page-container">
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
