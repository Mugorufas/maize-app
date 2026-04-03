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
            <div className="qa-item"><strong>When?</strong> Optimal planting occurs when soil temperatures reach 8°C–10°C (46-50°F) for several consecutive days.</div>
            <div className="qa-item"><strong>Why?</strong> Planting in warm soil ensure uniform germination and prevents seed rot caused by cold, wet conditions.</div>
            <div className="qa-item"><strong>How?</strong> Use a soil thermometer to check depth-level temperature and wait for the rainy season to establish consistent moisture.</div>
            <div className="qa-item"><strong>Where?</strong> Focus on well-drained loamy soils and avoid low-lying areas prone to early season waterlogging.</div>
            <div className="qa-item"><strong>Which?</strong> Choose planting windows that align with your region's historical rainfall peaks to maximize grain fill.</div>
          </div>
          <p className="full-explanation">
            Successful maize cultivation relies on precise timing. Planting too early into cold soil can lead to poor, uneven emergence and increased susceptibility to soil-borne pests. Conversely, planting too late may subject the crop to heat stress during critical reproductive stages. Monitor local weather forecasts and soil moisture levels closely to hit the "perfect window."
          </p>
        </section>

        <section id="varieties" className="detailed-card">
          <h2>Choosing Maize Varieties</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>Which?</strong> Select between hybrid, open-pollinated (OPV), or specialty varieties like yellow vs. white maize.</div>
            <div className="qa-item"><strong>Why?</strong> The right variety determines your yield potential, disease resistance, and environmental adaptation.</div>
            <div className="qa-item"><strong>How?</strong> Analyze your local climate (rainfall, temperature) and market demand before purchasing seeds.</div>
            <div className="qa-item"><strong>When?</strong> Purchase seeds well in advance of the planting season from certified agricultural dealers.</div>
            <div className="qa-item"><strong>Where?</strong> High-altitude areas require late-maturing, cold-tolerant varieties, while lowlands need early-maturing, drought-tolerant types.</div>
          </div>
          <p className="full-explanation">
            Variety selection is the foundation of your harvest. Late-maturing hybrids typically offer higher yields but require more water over a longer period. Early-maturing varieties are safer for regions with shorter rainy seasons, helping you "beat the drought." Always look for certified seeds with high germination rates (90%+).
          </p>
        </section>

        <section id="land-prep" className="detailed-card">
          <h2>Land Preparation & Spacing</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>How?</strong> Start with deep tillage (20-30cm) to break the soil and incorporate organic matter.</div>
            <div className="qa-item"><strong>Why?</strong> Proper tillage improves root aeration, water infiltration, and makes it easier for seedlings to break the surface.</div>
            <div className="qa-item"><strong>When?</strong> 2-4 weeks before planting to allow the soil to settle and organic matter to decompose.</div>
            <div className="qa-item"><strong>Where?</strong> Focus on maintaining a level surface and correct field slanting to prevent erosion during irrigation.</div>
            <div className="qa-item"><strong>Which?</strong> Use spacing of 60-90cm between rows and 15-25cm between plants for optimal density.</div>
          </div>
          <p className="full-explanation">
            A uniform seedbed is critical. Soil pH should ideally be between 5.8 and 7.0 for optimal nutrient uptake. If your soil is acidic, apply lime during land preparation. Accurate spacing ensures every plant has access to its own vertical tunnel of sunlight and root zone, minimizing intra-crop competition.
          </p>
        </section>

        <section id="planting-methods" className="detailed-card">
          <h2>Planting Methods</h2>
          <div className="qa-grid">
            <div className="qa-item"><strong>How?</strong> Use a precision planter or manual dibbling, ensuring a consistent depth of 4-7 cm.</div>
            <div className="qa-item"><strong>Why?</strong> Consistent depth leads to "synchronous emergence," where all plants grow at the same rate.</div>
            <div className="qa-item"><strong>When?</strong> Plant immediately after soil preparation when moisture levels are at their peak.</div>
            <div className="qa-item"><strong>Which?</strong> Direct seeding is the standard; however, zero-tillage methods are gaining popularity for moisture conservation.</div>
            <div className="qa-item"><strong>Where?</strong> Ensure seeds are placed directly into the moisture zone, not just sitting in dry topsoil.</div>
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
