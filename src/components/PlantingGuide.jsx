import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './PlantingGuide.css';

// Import custom generated images
import bestTimeImg from '../assets/best_time_to_plant_1775160851968.png';
import varietiesImg from '../assets/choosing_maize_varieties_1775160884025.png';
import landPrepImg from '../assets/land_preparation_1775161209811.png';
import methodsImg from '../assets/planting_methods_1775161225120.png';

const imageMap = {
  'best-time': bestTimeImg,
  'varieties': varietiesImg,
  'land-prep': landPrepImg,
  'methods': methodsImg
};

function PlantingGuide() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(doc(db, 'guides', 'planting'), (snapshot) => {
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

  if (isLoading) {
    return <div className="guide-loading">Loading Expert Content...</div>;
  }

  // Fallback if not seeded yet
  if (!content) {
    return <div className="guide-loading">Waiting for content to be seeded from Admin Panel...</div>;
  }

  return (
    <div className="planting-guide-container">
      <h1 className="planting-guide-title">{content.heroTitle}</h1>
      
      <div className="planting-grid">
        {content.cards.map((card, index) => (
          <div 
            key={index} 
            className="planting-card" 
            onClick={() => scrollToSection(card.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-top-gradient"></div>
            <h3 className="card-title">{card.title}</h3>
            <img src={card.img || imageMap[card.imageKey]} alt={card.title} className="card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-sections">
        {content.sections.map((section) => (
          <section key={section.id} id={section.id} className="detailed-card">
            <h2>{section.title}</h2>
            <div className="qa-grid">
              {section.items.map((item, idx) => (
                <div key={idx} className="qa-item">
                  <strong>{item.label}</strong> <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                </div>
              ))}
            </div>
            <p className="full-explanation" dangerouslySetInnerHTML={{ __html: section.explanation }}></p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default PlantingGuide;
