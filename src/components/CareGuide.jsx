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
            <div className="care-qa-item"><strong>Most Critical Growth Stage</strong> Tasseling and silking are the peak water-demand period. Drought stress here alone can reduce your yield by up to 50%.</div>
            <div className="care-qa-item"><strong>Why Maize Is Water-Sensitive</strong> Maize relies on turgor pressure for silk elongation and successful pollination, making it highly vulnerable to any water shortage.</div>
            <div className="care-qa-item"><strong>Recommended Irrigation Method</strong> Drip or furrow irrigation delivers water directly to the root zone. Avoid overhead sprinklers during tasseling to protect pollen viability.</div>
            <div className="care-qa-item"><strong>Effective Root Zone Depth</strong> Target the 30–60 cm soil depth where the plant performs 70% of its water and nutrient uptake activity.</div>
            <div className="care-qa-item"><strong>Drought-Proofing Strategy</strong> In dry regions, pair drought-tolerant seed varieties with surface mulching to maximize moisture retention between rains.</div>
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
            <div className="care-qa-item"><strong>Best Fertilizer at Planting</strong> Use a balanced NPK (e.g., 20:10:10) as a basal dressing and follow with nitrogen-rich CAN or Urea for topdressing during growth.</div>
            <div className="care-qa-item"><strong>Optimal Topdressing Timing</strong> Apply topdress at the V6 (knee-high) stage, around 4–6 weeks after emergence, when the plant's nutrient demand accelerates sharply.</div>
            <div className="care-qa-item"><strong>Role of Each Nutrient</strong> Nitrogen drives leaf area and grain protein. Phosphorus establishes strong roots and cob formation. Both must be balanced for top yields.</div>
            <div className="care-qa-item"><strong>Safe Application Method</strong> Ring or band fertilizer 5–10 cm from the stem base to avoid burning. Always incorporate Urea into moist soil to prevent nitrogen gas loss.</div>
            <div className="care-qa-item"><strong>Application on Sloped Fields</strong> On inclined plots, apply fertilizer on the uphill side of the plant so rainfall moves nutrients toward the root zone, not away.</div>
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
            <div className="care-qa-item"><strong>First Weeding Window</strong> Begin weeding within 2–3 weeks of crop emergence when weeds are still small and the maize plants are at their most vulnerable.</div>
            <div className="care-qa-item"><strong>Yield Loss From Weeds</strong> Striga weed alone can steal up to 80% of soil nutrients. Weeds also shelter pests and block light from reaching the crop canopy.</div>
            <div className="care-qa-item"><strong>Manual vs. Chemical Control</strong> Use mechanical hoeing on small plots. On larger farms, apply pre- and post-emergence herbicides without disturbing the maize root system.</div>
            <div className="care-qa-item"><strong>Natural Weed Suppression</strong> Once the canopy closes around the V10 stage, natural shading suppresses further weed germination. Keep rows clean until that point.</div>
            <div className="care-qa-item"><strong>Managing Parasitic Weeds</strong> For Striga infestations, apply the "Push-Pull" intercropping technique or use Striga-resistant maize varieties to break the cycle.</div>
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
