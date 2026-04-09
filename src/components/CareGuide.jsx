import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './CareGuide.css';

// Import custom images
import waterIrrigationImg from '../assets/water and irrigation.jpg';
import fertilizerAppImg from '../assets/fertilizer Aplication.webp';

const imageMap = {
  'watering': waterIrrigationImg,
  'fertilizer': fertilizerAppImg,
  'weeding': "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
};

const CareGuide = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(doc(db, 'guides', 'care'), (snapshot) => {
      if (snapshot.exists()) {
        setContent(snapshot.data().live);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) return <div className="guide-loading">Loading Expert Care Advice...</div>;
  if (!content) return <div className="guide-loading">Content coming soon! Please seed guides in Admin Panel.</div>;

  return (
    <div className="care-guide-container">
      <div className="care-hero">
        <h1 className="care-guide-title">{content.heroTitle}</h1>
        <p className="care-hero-subtitle">{content.heroSubtitle}</p>
      </div>

      <div className="care-staggered-grid">
        {content.steps.map((step, index) => (
          <div 
            key={index} 
            className={`care-card-premium ${step.accent}`}
            onClick={() => scrollToSection(step.id)}
          >
            <div className="care-card-overlay">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="explore-btn">Learn How →</span>
            </div>
            <img src={step.img || step.image || imageMap[step.imageKey]} alt={step.title} className="care-card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-care-sections">
        {content.sections.map((section) => (
          <section key={section.id} id={section.id} className="care-detail-glass">
            <div className="detail-header">
              <span className="detail-badge">{section.badge}</span>
              <h2>{section.title}</h2>
            </div>
            <div className="care-qa-grid">
              {section.items.map((item, idx) => (
                <div key={idx} className="care-qa-item">
                  <strong>{item.label}</strong> <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                </div>
              ))}
            </div>
            <div className="care-expert-tip" dangerouslySetInnerHTML={{ __html: section.expertTip }}></div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CareGuide;
