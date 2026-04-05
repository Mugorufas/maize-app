import React from 'react';
import './PestGuide.css';

import fawImg from '../assets/Fall ArmyWorm Header IMG.png';
import diseasesImg from '../assets/common diseases.png';
import preventionImg from '../assets/prevention and control.webp';

const PestGuide = () => {
  const pestSteps = [
    {
      id: "pests",
      title: "Common Pests",
      description: "Managing Fall Armyworm and other major threats.",
      image: fawImg,
      accent: "alert"
    },
    {
      id: "diseases",
      title: "Common Diseases",
      description: "Identifying and treating Northern Leaf Blight and Rot.",
      image: diseasesImg,
      accent: "caution"
    },
    {
      id: "ipm",
      title: "Integrated Pest Management",
      description: "A proactive 'Crop Defense' strategy for long-term health.",
      image: preventionImg,
      accent: "safe"
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pest-guide-container">
      <div className="pest-hero">
        <h1 className="pest-guide-title">Maize Pest & Disease Defense</h1>
        <p className="pest-hero-subtitle">Implement a professional 'Crop Defense' strategy to protect your yields from evolving threats.</p>
      </div>

      <div className="pest-staggered-grid">
        {pestSteps.map((step, index) => (
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
            <img src={step.image} alt={step.title} className="pest-card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-pest-sections">
        <section id="pests" className="pest-detail-glass">
          <div className="pest-detail-header">
            <span className="pest-badge alert-badge">Common Pests</span>
            <h2>Fall Armyworm & Stem Borers Strategy</h2>
          </div>
          <div className="pest-qa-grid">
            <div className="care-qa-item"><strong>Early Scouting Protocol</strong> Start field scouting from seedling emergence. Check leaf undersides for egg masses and inspect the central whorl daily for young larvae.</div>
            <div className="care-qa-item"><strong>Speed of Crop Damage</strong> Fall Armyworm can strip a plant's entire leaf area within days, eliminating its ability to photosynthesize and causing total crop failure.</div>
            <div className="care-qa-item"><strong>Treatment Application Method</strong> Hand-pick egg masses early, then apply Neem-based bio-pesticides or approved insecticides directly into the plant whorl where larvae shelter.</div>
            <div className="care-qa-item"><strong>Targeting the Larval Hiding Zone</strong> Larvae hide deep inside the whorl during daylight. Surface spraying alone fails — treatment must be poured or applied inside the funnel to reach them.</div>
            <div className="care-qa-item"><strong>Preventing Chemical Resistance</strong> Rotate between different insecticide groups each season. Supplement with biological agents like <em>Telenomus</em> wasps for sustainable long-term control.</div>
          </div>
          <div className="pest-expert-tip">
             Defense Tip: Deep ploughing before planting exposes pest pupae to the sun and predators, significantly reducing early-season pressure.
          </div>
        </section>

        <section id="diseases" className="pest-detail-glass">
          <div className="pest-detail-header">
            <span className="pest-badge caution-badge">Common Diseases</span>
            <h2>Northern Leaf Blight & Rot Management</h2>
          </div>
          <div className="pest-qa-grid">
            <div className="care-qa-item"><strong>Identifying Northern Leaf Blight</strong> Look for long, tan, canoe-shaped lesions that start on lower leaves and progress upward toward the ear as infection advances.</div>
            <div className="care-qa-item"><strong>Conditions That Favour Disease</strong> High humidity and warm nighttime temperatures create ideal conditions for fungal spread. Dense canopies with poor airflow worsen the situation.</div>
            <div className="care-qa-item"><strong>Breaking the Disease Cycle</strong> Rotate with non-cereal crops like soybeans or legumes between seasons. This starves fungal spores of their preferred host plant to complete the cycle.</div>
            <div className="care-qa-item"><strong>Highest-Risk Growth Window</strong> Scout weekly from V10 through to silking — this is when fungal and bacterial diseases cause the most damage to leaf area and grain fill.</div>
            <div className="care-qa-item"><strong>The Ear Leaf Indicator</strong> Monitor the ear leaf closely — if it stays green and disease-free through silking, your grain fill will most likely be successful and complete.</div>
          </div>
          <div className="pest-expert-tip">
             Defense Tip: Northern Leaf Blight spores survive on old maize residue. Burying or removing infected stalks is crucial for next season's health.
          </div>
        </section>

        <section id="ipm" className="pest-detail-glass">
          <div className="pest-detail-header">
            <span className="pest-badge safe-badge">Integrated Pest Management (IPM)</span>
            <h2>Proactive Crop Defense</h2>
          </div>
          <div className="pest-qa-grid">
            <div className="care-qa-item"><strong>The Four Pillars of IPM</strong> IPM integrates cultural, mechanical, biological, and chemical controls. Healthy soil and clean fields are the foundation of the whole strategy.</div>
            <div className="care-qa-item"><strong>Why Not to Rely on Chemicals Alone</strong> Chemical-only approaches breed resistance, increase costs, and harm beneficial insects. A diverse strategy delivers better results at a fraction of the cost.</div>
            <div className="care-qa-item"><strong>IPM as a Season-Long System</strong> Implementation starts before land preparation and runs continuously through harvest. It is an ongoing commitment, not a one-time spray event.</div>
            <div className="care-qa-item"><strong>Field Border Trap Crops</strong> Plant a sacrificial crop around the field perimeter to attract and concentrate pests, keeping them away from the main maize stand at the center.</div>
            <div className="care-qa-item"><strong>Push-Pull Technology</strong> Intercrop Desmodium between maize rows (pushes pests away) and plant Napier Grass on borders (pulls them in) to control borers and Striga weed naturally.</div>
          </div>
          <div className="pest-expert-tip">
             Defense Tip: Maintaining balanced fertilization ensures broad-leaved plants have the strength to "outgrow" minor pest damage.
          </div>
        </section>
      </div>
    </div>
  );
};

export default PestGuide;
