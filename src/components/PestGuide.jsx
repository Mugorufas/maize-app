import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './PestGuide.css';
import AIPestScanner from './common/AIPestScanner';

import fawImg from '../assets/Fall ArmyWorm Header IMG.png';
import diseasesImg from '../assets/common diseases.png';
import preventionImg from '../assets/prevention and control.webp';

const imageMap = {
  'pests': fawImg,
  'diseases': diseasesImg,
  'ipm': preventionImg
};

const PestGuide = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(doc(db, 'guides', 'pests'), (snapshot) => {
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

  if (isLoading) return <div className="guide-loading">Loading Crop Defense Strategies...</div>;
  if (!content) return <div className="guide-loading">Content coming soon! Please seed guides in Admin Panel.</div>;

  return (
    <div className="pest-guide-container">
      <div className="pest-hero">
        <h1 className="pest-guide-title">{content.heroTitle}</h1>
        <p className="pest-hero-subtitle">{content.heroSubtitle}</p>
      </div>

      <AIPestScanner />

      <div className="pest-staggered-grid">
        {content.steps.map((step, index) => (
          <div 
            key={index} 
            className={`pest-card-premium ${step.accent}`}
            onClick={() => scrollToSection(step.id)}
          >
            <div className="pest-card-overlay-defense">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="defense-btn">View Strategy →</span>
            </div>
            <img src={step.img || step.image || imageMap[step.imageKey]} alt={step.title} className="pest-card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-pest-sections">
        {content.sections.map((section) => (
          <section key={section.id} id={section.id} className="pest-detail-glass">
            <div className="pest-detail-header">
              <span className={`pest-badge ${section.id === 'pests' ? 'alert-badge' : section.id === 'diseases' ? 'caution-badge' : 'safe-badge'}`}>
                {section.badge}
              </span>
              <h2>{section.title}</h2>
            </div>
            <div className="pest-qa-grid">
              {section.items.map((item, idx) => (
                <div key={idx} className="care-qa-item">
                  <strong>{item.label}</strong> <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                </div>
              ))}
            </div>
            <div className="pest-expert-tip" dangerouslySetInnerHTML={{ __html: section.expertTip }}></div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PestGuide;
