import React from 'react';
import './HarvestGuide.css';

import timingImg from '../assets/timing and maturity.jpeg';
import harvestMethodImg from '../assets/harvesting method.jpeg';
import storageImg from '../assets/handling and storange .jpeg';

const HarvestGuide = () => {
  const harvestSteps = [
    {
      id: "timing",
      title: "Timing & Maturity",
      description: "Identifying the perfect window for maximum grain quality.",
      image: timingImg,
      accent: "gold"
    },
    {
      id: "methods",
      title: "Harvesting Methods",
      description: "Precision manual and mechanical techniques.",
      image: harvestMethodImg,
      accent: "mint"
    },
    {
      id: "storage",
      title: "Handling & Storage",
      description: "Ensuring long-term safety and quality preservation.",
      image: storageImg,
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
            <div className="care-qa-item"><strong>Black Layer Formation</strong> Watch for the black layer at the kernel base — it signals the plant has stopped sending nutrients to the grain and is ready to harvest.</div>
            <div className="care-qa-item"><strong>Risk of Wrong Timing</strong> Early harvest yields shrivelled grains that won't dry well; late harvest exposes the crop to lodging, pest attack, and dangerous mold growth.</div>
            <div className="care-qa-item"><strong>Visual Maturity Signs</strong> Look for drooping cobs and dry, brown husks. Press a kernel with your fingernail — it should be rock hard and impossible to dent.</div>
            <div className="care-qa-item"><strong>Field Sampling Before Harvest</strong> Test cobs from several locations across the field to confirm uniform maturity before committing to large-scale harvesting.</div>
            <div className="care-qa-item"><strong>Moisture Targets by Use</strong> Harvest silage at 30–35% moisture. For dry grain storage, target 20–25% at field harvest then dry down further post-harvest.</div>
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
            <div className="care-qa-item"><strong>Manual Harvesting Technique</strong> Pull cobs firmly downward and snap from the stalk. For mechanical harvest, calibrate combine settings carefully to reduce grain cracking and field losses.</div>
            <div className="care-qa-item"><strong>Danger of Poor Machine Settings</strong> Cracked grain surfaces act as entry points for mold and insects during storage, significantly shortening shelf life and quality.</div>
            <div className="care-qa-item"><strong>Ideal Field Moisture for Machines</strong> Begin mechanical operations when field moisture is below 25% to prevent heavy equipment from compacting and damaging soil structure.</div>
            <div className="care-qa-item"><strong>Tools for Stalk Harvesting</strong> Use sharp sickles or machetes when collecting stalks alongside cobs, particularly when the biomass is intended for animal fodder.</div>
            <div className="care-qa-item"><strong>Systematic Field Movement</strong> Always start at one end and work in a consistent direction to avoid trampling and destroying unharvested rows still standing.</div>
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
            <div className="care-qa-item"><strong>Safe Storage Moisture Level</strong> Grain must reach 13–14% moisture or below before storage. Higher moisture levels directly lead to aflatoxin development and rapid spoilage.</div>
            <div className="care-qa-item"><strong>Aflatoxin Health Risk</strong> Aspergillus fungi thrive in damp grain and produce aflatoxins — toxic compounds that are dangerous to both human health and livestock.</div>
            <div className="care-qa-item"><strong>Correct Drying Practice</strong> Spread grain on tarpaulins, never on bare ground. Once at target moisture, move to airtight hermetic bins or metal silos for long-term safety.</div>
            <div className="care-qa-item"><strong>Pre-Harvest Storage Prep</strong> Clean and disinfect your storage structure 2–4 weeks before harvest to eliminate any pests or fungal spores left over from the previous season.</div>
            <div className="care-qa-item"><strong>Preventing Floor Moisture</strong> Always place bags on wooden pallets to block ground dampness. Store in a cool, shaded, well-ventilated area away from direct sunlight.</div>
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
