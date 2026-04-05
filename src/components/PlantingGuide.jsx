import React from 'react';
import './PlantingGuide.css';

// Import custom generated images
import bestTimeImg from '../assets/best_time_to_plant_1775160851968.png';
import varietiesImg from '../assets/choosing_maize_varieties_1775160884025.png';
import landPrepImg from '../assets/land_preparation_1775161209811.png';
import methodsImg from '../assets/planting_methods_1775161225120.png';

function PlantingGuide() {
  const cards = [
    { id: "best-time", title: "Best Time to Plant", img: bestTimeImg },
    { id: "varieties", title: "Choosing Maize Varieties", img: varietiesImg },
    { id: "land-prep", title: "Land Preparation & Spacing", img: landPrepImg },
    { id: "planting-methods", title: "Planting Methods", img: methodsImg },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="planting-guide-container">
      <h1 className="planting-guide-title">Maize Planting Guide</h1>
      
      <div className="planting-grid">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="planting-card" 
            onClick={() => scrollToSection(card.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-top-gradient"></div>
            <h3 className="card-title">{card.title}</h3>
            <img src={card.img} alt={card.title} className="card-img" />
          </div>
        ))}
      </div>

      <div className="detailed-sections">
        <section id="best-time" className="detailed-card">
          <h2>Best Time to Plant</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>Ideal Soil Temperature</strong> Plant when soil reaches 8°C–10°C for several consecutive days. Never sow into cold soil as it prevents germination.</div>
            <div className="qa-item"><strong>Why Timing Matters</strong> Warm soil guarantees uniform germination and shields seeds from rot caused by cold, waterlogged conditions.</div>
            <div className="qa-item"><strong>How to Check Readiness</strong> Use a soil thermometer at 5–10 cm depth and wait for the rains to establish steady soil moisture before sowing.</div>
            <div className="qa-item"><strong>Best Field Location</strong> Prioritize well-drained loamy fields and avoid low-lying depressions prone to early-season waterlogging.</div>
            <div className="qa-item"><strong>Aligning With Rainfall</strong> Match your planting window to your region's peak rainfall season to maximize moisture during the critical grain fill stage.</div>
          </div>
          <p className="full-explanation">
            Successful maize cultivation relies on precise timing. Planting too early into cold soil can lead to poor, uneven emergence and increased susceptibility to soil-borne pests. Conversely, planting too late may subject the crop to heat stress during critical reproductive stages. Monitor local weather forecasts and soil moisture levels closely to hit the "perfect window."
          </p>
        </section>

        <section id="varieties" className="detailed-card">
          <h2>Choosing Maize Varieties</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>Types of Varieties</strong> Choose between hybrid, open-pollinated (OPV), or specialty types. Hybrids offer higher yields while OPVs allow seed saving.</div>
            <div className="qa-item"><strong>Why Variety Selection Is Critical</strong> Your choice directly determines yield potential, disease resistance, and how well the crop adapts to your local environment.</div>
            <div className="qa-item"><strong>How to Make the Right Choice</strong> Evaluate your local rainfall pattern, altitude, and intended market before approaching any certified seed dealer.</div>
            <div className="qa-item"><strong>When to Purchase Seeds</strong> Buy from certified dealers well before the planting season begins to guarantee availability, viability, and quality.</div>
            <div className="qa-item"><strong>Matching Altitude &amp; Climate</strong> High-altitude farms need cold-tolerant, late-maturing varieties; lowland farms perform best with early-maturing, drought-tolerant types.</div>
          </div>
          <p className="full-explanation">
            Variety selection is the foundation of your harvest. Late-maturing hybrids typically offer higher yields but require more water over a longer period. Early-maturing varieties are safer for regions with shorter rainy seasons, helping you "beat the drought." Always look for certified seeds with high germination rates (90%+).
          </p>
        </section>

        <section id="land-prep" className="detailed-card">
          <h2>Land Preparation & Spacing</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>Tillage Depth &amp; Technique</strong> Till to 20–30 cm to break hardpans, loosen the soil, and fully work in compost or organic matter before sowing.</div>
            <div className="qa-item"><strong>Benefits of Deep Tillage</strong> A well-tilled soil improves root aeration and water infiltration, allowing seedlings to emerge quickly and establish strongly.</div>
            <div className="qa-item"><strong>Preparation Timeline</strong> Complete all land preparation 2–4 weeks before planting so the soil can settle and organic matter can begin breaking down into nutrients.</div>
            <div className="qa-item"><strong>Levelling &amp; Erosion Control</strong> Keep the seedbed surface level and correct any slope to prevent soil erosion and nutrient loss during irrigation or heavy rainfall.</div>
            <div className="qa-item"><strong>Correct Row Spacing</strong> Space rows 60–90 cm apart and plants 15–25 cm within rows for the optimal planting density and maximum sunlight interception.</div>
          </div>
          <p className="full-explanation">
            A uniform seedbed is critical. Soil pH should ideally be between 5.8 and 7.0 for optimal nutrient uptake. If your soil is acidic, apply lime during land preparation. Accurate spacing ensures every plant has access to its own vertical tunnel of sunlight and root zone, minimizing intra-crop competition.
          </p>
        </section>

        <section id="planting-methods" className="detailed-card">
          <h2>Planting Methods</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>Planting Depth &amp; Tools</strong> Use a precision planter or dibbling stick to maintain a consistent seed depth of 4–7 cm across the entire field.</div>
            <div className="qa-item"><strong>Why Uniform Depth Matters</strong> Consistent depth produces "synchronous emergence" so all plants rise together and compete equally for light, water, and nutrients.</div>
            <div className="qa-item"><strong>Optimal Planting Moment</strong> Sow immediately after soil preparation while moisture is at its peak — ideally at the very start of the seasonal rains.</div>
            <div className="qa-item"><strong>Seeding Method Options</strong> Direct seeding is standard, but zero-tillage planting is increasingly popular for conserving soil moisture and reducing erosion.</div>
            <div className="qa-item"><strong>Correct Seed Placement</strong> Always place seeds in the moist soil layer, never in dry topsoil — seeds sitting above the moisture zone will simply fail to germinate.</div>
          </div>
          <p className="full-explanation">
            Precision is the key difference between a good crop and a great one. Mechanical planting at a steady speed ensures equidistant spacing, which simplifies future tasks like weeding and harvesting. For smaller plots, use a planting rope or marked stick to maintain straight rows for better management.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PlantingGuide;
