import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './HarvestGuide.css';

import timingImg from '../assets/timing and maturity.jpeg';
import harvestMethodImg from '../assets/harvesting method.jpeg';
import storageImg from '../assets/handling and storange .jpeg';

const imageMap = {
  'timing': timingImg,
  'methods': harvestMethodImg,
  'storage': storageImg
};

const HarvestGuide = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(doc(db, 'guides', 'harvest'), (snapshot) => {
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

  if (isLoading) return <div className="guide-loading">Loading Expert Harvest Data...</div>;
  if (!content) return <div className="guide-loading">Content coming soon! Please seed guides in Admin Panel.</div>;

  return (
    <div className="harvest-guide-container">
      <div className="harvest-hero">
        <h1 className="harvest-guide-title">{content.heroTitle}</h1>
        <p className="harvest-hero-subtitle">{content.heroSubtitle}</p>
      </div>

      <div className="harvest-staggered-grid">
        {content.steps.map((step, index) => (
          <div 
            key={index} 
            className={`harvest-card-premium ${step.accent}`}
            onClick={() => scrollToSection(step.id)}
          >
            <div className="harvest-card-overlay">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="explore-btn-harvest">Explore Guide →</span>
            </div>
            <img src={step.img || step.image || imageMap[step.imageKey]} alt={step.title} className="harvest-card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-harvest-sections">
        {content.sections.map((section) => (
          <section key={section.id} id={section.id} className="harvest-detail-glass">
            <div className="harvest-detail-header">
              <span className="harvest-badge gold-badge">{section.badge}</span>
              <h2>{section.title}</h2>
            </div>
            <div className="harvest-qa-grid">
              {section.items.map((item, idx) => (
                <div key={idx} className="care-qa-item">
                  <strong>{item.label}</strong> <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                </div>
              ))}
            </div>
            <div className="harvest-expert-tip" dangerouslySetInnerHTML={{ __html: section.expertTip }}></div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HarvestGuide;
