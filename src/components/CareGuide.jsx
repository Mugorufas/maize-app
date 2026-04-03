import React from 'react';
import './CareGuide.css';

// Import custom images
import waterIrrigationImg from '../assets/water and irrigation.jpg';
import fertilizerAppImg from '../assets/fertilizer Aplication.webp';

const CareGuide = () => {
  const careSteps = [
    {
      id: "watering",
      title: "Watering & Irrigation",
      description: "Managing moisture for peak yield.",
      image: waterIrrigationImg,
      accent: "mint"
    },
    {
      id: "fertilizer",
      title: "Fertilizer Application",
      description: "Fueling growth with nutrients.",
      image: fertilizerAppImg,
      accent: "gold"
    },
    {
      id: "weeding",
      title: "Weed Control",
      description: "Protecting resources from competition.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800",
      accent: "mint"
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="care-guide-container">
      <div className="care-hero">
        <h1 className="care-guide-title">Maize Crop Care & Maintenance</h1>
        <p className="care-hero-subtitle">Optimize your harvest with professional management during the critical growth phases.</p>
      </div>

      <div className="care-staggered-grid">
        {careSteps.map((step, index) => (
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
            <img src={step.image} alt={step.title} className="care-card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-care-sections">
        <section id="watering" className="care-detail-glass">
          <div className="detail-header">
            <span className="detail-badge">Watering & Irrigation</span>
            <h2>How to Master Moisture Control</h2>
          </div>
          <div className="care-qa-grid">
            <div className="care-qa-item"><strong>When?</strong> The most critical stages are **tasseling and silking**. Moisture stress during these 2-3 weeks can reduce yield by up to 50%.</div>
            <div className="care-qa-item"><strong>Why?</strong> Maize is highly sensitive to water stress because it relies on turgor pressure for silk elongation and successful pollination.</div>
            <div className="care-qa-item"><strong>How?</strong> Use drip or furrow irrigation to deliver water directly to the root zone. Avoid overhead irrigation during tasseling to prevent washing away pollen.</div>
            <div className="care-qa-item"><strong>Where?</strong> Focus water on the effective root zone (about 30-60cm deep) where the plant does 70% of its nutrient/water extraction.</div>
            <div className="care-qa-item"><strong>Which?</strong> In drier regions, consider drought-tolerant varieties combined with soil mulching to conserve existing moisture.</div>
          </div>
          <div className="care-expert-tip">
             Professional Tip: Check soil moisture by "balling" soil in your hand. If it crumbles easily, it's time to irrigate.
          </div>
        </section>

        <section id="fertilizer" className="care-detail-glass">
          <div className="detail-header">
            <span className="detail-badge gold-badge">Fertilizer Application</span>
            <h2>Maximizing Nutrient Efficiency</h2>
          </div>
          <div className="care-qa-grid">
            <div className="care-qa-item"><strong>Which?</strong> Use a balanced NPK fertilizer (e.g., 20:10:10) at planting and high-nitrogen fertilizers like CAN or Urea for top-dressing.</div>
            <div className="care-qa-item"><strong>When?</strong> Top-dress when the maize is **knee-high (V6 stage)**, usually 4-6 weeks after emergence. This is when rapid growth begins.</div>
            <div className="care-qa-item"><strong>Why?</strong> Nitrogen is the primary driver of leaf area and grain protein. Phosphorus is critical for root and cob development.</div>
            <div className="care-qa-item"><strong>How?</strong> Apply fertilizer in a ring or band 5-10cm from the stem base to avoid burning. Incorporate it into the soil if using Urea to prevent loss to the air.</div>
            <div className="care-qa-item"><strong>Where?</strong> On slanting plots, apply on the "upper side" of the plant so rain washes nutrients toward the roots, not away.</div>
          </div>
          <div className="care-expert-tip">
             Professional Tip: Yellowing of lower leaves (V-shaped) usually indicates a Nitrogen deficiency that needs immediate top-dressing.
          </div>
        </section>

        <section id="weeding" className="care-detail-glass">
          <div className="detail-header">
            <span className="detail-badge">Weed Control</span>
            <h2>The Fight for Resources</h2>
          </div>
          <div className="care-qa-grid">
            <div className="care-qa-item"><strong>When?</strong> First weeding should happen within **2-3 weeks of emergence**. Weeds are most damaging when the maize is young and vulnerable.</div>
            <div className="care-qa-item"><strong>Why?</strong> Weeds like Striga can steal up to 80% of nutrients. They also harbor pests and block sunlight from reaching the crop.</div>
            <div className="care-qa-item"><strong>How?</strong> Use mechanical hoeing for small plots, or pre-emergence and post-emergence herbicides for larger farms. Be careful not to damage the maize roots.</div>
            <div className="care-qa-item"><strong>Where?</strong> Ensure the rows are kept completely clean. Once the maize canopy closes (around V10), the shade will naturally suppress new weeds.</div>
            <div className="care-qa-item"><strong>Which?</strong> For parasitic weeds like Striga, use "Push-Pull" technology or resistant maize varieties to break the cycle.</div>
          </div>
          <div className="care-expert-tip">
             Professional Tip: Avoid weeding during flowering as soil disturbance can disturb the delicate root activity needed for grain fill.
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareGuide;
