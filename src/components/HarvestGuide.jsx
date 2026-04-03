import React from 'react';
import './HarvestGuide.css';

const HarvestGuide = () => {
  const harvestSteps = [
    {
      id: "timing",
      title: "Timing & Maturity",
      description: "Identifying the perfect window for maximum grain quality.",
      image: "https://images.unsplash.com/photo-1595841696677-6479f6c77ba2?auto=format&fit=crop&q=80&w=800",
      accent: "gold"
    },
    {
      id: "methods",
      title: "Harvesting Methods",
      description: "Precision manual and mechanical techniques.",
      image: "https://images.unsplash.com/photo-1505471768190-275ab2040669?auto=format&fit=crop&q=80&w=800",
      accent: "mint"
    },
    {
      id: "storage",
      title: "Handling & Storage",
      description: "Ensuring long-term safety and quality preservation.",
      image: "https://images.unsplash.com/photo-1621257409278-f682855fce7d?auto=format&fit=crop&q=80&w=800",
      accent: "gold"
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="harvest-guide-container">
      <div className="harvest-hero">
        <h1 className="harvest-guide-title">Maize Harvesting Guide</h1>
        <p className="harvest-hero-subtitle">Turn your hard work into a high-quality yield with professional harvesting and storage techniques.</p>
      </div>

      <div className="harvest-staggered-grid">
        {harvestSteps.map((step, index) => (
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
            <img src={step.image} alt={step.title} className="harvest-card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-harvest-sections">
        <section id="timing" className="harvest-detail-glass">
          <div className="harvest-detail-header">
            <span className="harvest-badge gold-badge">Timing & Maturity</span>
            <h2>How to Identify Physiological Maturity</h2>
          </div>
          <div className="harvest-qa-grid">
            <div className="care-qa-item"><strong>When?</strong> Monitor for the **"Black Layer"** formation at the base of the kernel. This indicates the plant has stopped moving nutrients to the grain.</div>
            <div className="care-qa-item"><strong>Why?</strong> Harvesting too early leads to shrivelled grains and difficult drying. Harvesting too late increases the risk of lodging, pests, and mold.</div>
            <div className="care-qa-item"><strong>How?</strong> Check for drooping cobs (where the ear points downward) and dry, brown husks. Kernels should be hard and difficult to dent with a fingernail.</div>
            <div className="care-qa-item"><strong>Where?</strong> Sample cobs from different parts of the field to ensure uniform maturity before starting a large-scale harvest.</div>
            <div className="care-qa-item"><strong>Which?</strong> For silage, harvest at 30-35% moisture. For dry grain, aim for 20-25% moisture before field harvest, then dry further.</div>
          </div>
          <div className="harvest-expert-tip">
             Professional Tip: Grain moisture content at physiological maturity is typically 30–35%. Immediate post-harvest drying is essential to maintain quality.
          </div>
        </section>

        <section id="methods" className="harvest-detail-glass">
          <div className="harvest-detail-header">
            <span className="harvest-badge">Harvesting Methods</span>
            <h2>Precision Manual and Mechanical Tools</h2>
          </div>
          <div className="harvest-qa-grid">
            <div className="care-qa-item"><strong>How?</strong> For manual harvest, pull cobs downward and snap them from the stalk. For mechanical, ensure combine harvesters are properly calibrated to reduce grain loss.</div>
            <div className="care-qa-item"><strong>Why?</strong> Improper mechanical settings can "crack" the grains, creating entry points for future mold and insect infestations.</div>
            <div className="care-qa-item"><strong>When?</strong> Start harvesting when moisture levels are below 25% if field conditions allow, to minimize machine damage to the soil.</div>
            <div className="care-qa-item"><strong>Which?</strong> Use sharp sickles or knives if harvesting stalks alongside cobs for animal fodder.</div>
            <div className="care-qa-item"><strong>Where?</strong> Start at one end of the field and move systematically to avoid trampling unharvested crops.</div>
          </div>
          <div className="harvest-expert-tip">
             Professional Tip: If harvesting manually, use a "cobbing" tool to speed up the process and protect your hands from husk abrasions.
          </div>
        </section>

        <section id="storage" className="harvest-detail-glass">
          <div className="harvest-detail-header">
            <span className="harvest-badge gold-badge">Handling & Storage</span>
            <h2>Ensuring Long-Term Safety</h2>
          </div>
          <div className="harvest-qa-grid">
            <div className="care-qa-item"><strong>Which?</strong> For storage, the target moisture content must be **13–14% or less**. Anything higher will lead to aflatoxins and rotting.</div>
            <div className="care-qa-item"><strong>Why?</strong> Fungal growth (Aspergillus) in damp maize produces toxic aflatoxins, which are dangerous to humans and livestock.</div>
            <div className="care-qa-item"><strong>How?</strong> Dry the grain on tarpaulins (not directly on the ground) until it reaches the target moisture. Use airtight (hermetic) bins for long-term storage.</div>
            <div className="care-qa-item"><strong>When?</strong> Clean and disinfect your storage facility **2-4 weeks before** the harvest arrives to eliminate hiding pests.</div>
            <div className="care-qa-item"><strong>Where?</strong> Use pallets under bags to prevent moisture from the floor from soaking into the grain. Store in a cool, well-ventilated area.</div>
          </div>
          <div className="harvest-expert-tip">
             Professional Tip: Perform a "salt test" in a jar to determine if the grain is dry enough for safe storage if you lack a moisture meter.
          </div>
        </section>
      </div>
    </div>
  );
};

export default HarvestGuide;
