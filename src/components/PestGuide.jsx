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
            <div className="care-qa-item"><strong>When?</strong> Begin scouting at seedling emergence. Check for egg masses on the underside of leaves and young larvae in the whorl.</div>
            <div className="care-qa-item"><strong>Why?</strong> Fall Armyworm (FAW) can strip a plant's leaves in days, destroying its ability to photosynthesize and leading to total crop failure.</div>
            <div className="care-qa-item"><strong>How?</strong> Use mechanical control by hand-picking egg masses, or apply bio-pesticides (Neem) and recommended insecticides directly into the whorls.</div>
            <div className="care-qa-item"><strong>Where?</strong> Focus on the "Whorl" (the center of the plant) where larvae hide during the day. Treatment must reach this funnel to be effective.</div>
            <div className="care-qa-item"><strong>Which?</strong> Rotate insecticide chemistry to prevent resistance. Biological control agents like *Telenomus* can also be used.</div>
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
            <div className="care-qa-item"><strong>Which?</strong> Northern Leaf Blight (NLB) is the most common disease. Look for long, tan, canoe-shaped lesions on the lower leaves progressing upward.</div>
            <div className="care-qa-item"><strong>Why?</strong> Diseases thrive in high humidity and warm temperatures. If left unchecked, they reduce the leaf area available for grain fill.</div>
            <div className="care-qa-item"><strong>How?</strong> Use crop rotation with non-cereal crops (like soybeans) to break the disease cycle. Plant resistant or tolerant hybrids.</div>
            <div className="care-qa-item"><strong>When?</strong> Most diseases strike during the vegetative and early reproductive stages (V10 to Silking). Scout weekly during this window.</div>
            <div className="care-qa-item"><strong>Where?</strong> Pay close attention to the "Ear Leaf"—if this leaf stays healthy, your grain fill will likely be successful.</div>
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
            <div className="care-qa-item"><strong>How?</strong> IPM combines cultural, mechanical, biological, and chemical tools. Start with clean fields and healthy soil to build the plant's natural resistance.</div>
            <div className="care-qa-item"><strong>Why?</strong> Relying solely on chemicals is expensive and leads to resistance. A diverse strategy is more sustainable and cost-effective.</div>
            <div className="care-qa-item"><strong>When?</strong> IPM starts **before planting** (with soil prep) and continues through to **harvest**. It is a season-long commitment to monitoring.</div>
            <div className="care-qa-item"><strong>Where?</strong> Implementation starts at the field borders. Using "trap crops" around your field can lure pests away from your main maize crop.</div>
            <div className="care-qa-item"><strong>Which?</strong> Use "Push-Pull" technology—planting Desmodium (push) and Napier Grass (pull) to naturally manage borers and Striga weed.</div>
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
