import React, { useState, useEffect } from 'react';
import './ResourceModal.css';

/* ============================================================
   CONTENT DEFINITIONS — one object per resource
   ============================================================ */
const RESOURCES = {
  soil: {
    id: 'soil',
    icon: '🪱',
    title: 'Soil Analysis Guide',
    subtitle: 'Understand your soil before you plant',
    render: () => <SoilContent />,
  },
  irrigation: {
    id: 'irrigation',
    icon: '💧',
    title: 'Irrigation Tips',
    subtitle: 'Optimal water management for maize',
    render: () => <IrrigationContent />,
  },
  fertilizer: {
    id: 'fertilizer',
    icon: '🌱',
    title: 'Fertilizer Guide',
    subtitle: 'NPK ratios, timing & dosage for maize',
    render: () => <FertilizerContent />,
  },
  calculator: {
    id: 'calculator',
    icon: '🧮',
    title: 'Yield Calculator',
    subtitle: 'Estimate your maize harvest before planting',
    render: () => <YieldCalculator />,
  },
};

/* ============================================================
   MAIN MODAL COMPONENT
   ============================================================ */
export default function ResourceModal({ resourceId, onClose }) {
  const resource = RESOURCES[resourceId];

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!resource) return null;

  return (
    <div
      className="resource-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={resource.title}
    >
      <div className="resource-modal">
        {/* Header */}
        <div className="resource-modal-header">
          <span className="resource-modal-icon">{resource.icon}</span>
          <div>
            <h2>{resource.title}</h2>
            <p>{resource.subtitle}</p>
          </div>
          <button
            className="resource-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="resource-modal-body">
          {resource.render()}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SOIL ANALYSIS CONTENT
   ============================================================ */
function SoilContent() {
  return (
    <>
      <div className="rm-card-grid">
        <div className="rm-card">
          <div className="rm-card-icon">🧪</div>
          <h4>Ideal pH Range</h4>
          <p>Maize thrives in a pH of <strong>5.8 – 7.0</strong>. Outside this range, nutrients become unavailable.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🌍</div>
          <h4>Soil Texture</h4>
          <p>Loamy or sandy-loam soils are best — they balance drainage and water retention perfectly.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🌊</div>
          <h4>Drainage</h4>
          <p>Avoid waterlogged areas. Maize roots need oxygen — standing water causes root rot within 48 hrs.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🔬</div>
          <h4>Organic Matter</h4>
          <p>Aim for at least <strong>3% organic matter</strong>. Add compost or green manure before planting.</p>
        </div>
      </div>

      <p className="rm-section-title">📊 Soil pH Impact on Nutrients</p>
      <table className="rm-table">
        <thead>
          <tr>
            <th>pH Level</th>
            <th>Status</th>
            <th>Effect on Maize</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Below 5.5</td><td><span className="rm-badge rm-badge-red">Too Acidic</span></td><td>Aluminium toxicity, P & Mg deficiency</td></tr>
          <tr><td>5.5 – 5.8</td><td><span className="rm-badge rm-badge-yellow">Marginal</span></td><td>Slight yield reduction, lime recommended</td></tr>
          <tr><td>5.8 – 7.0</td><td><span className="rm-badge rm-badge-green">Optimal</span></td><td>Maximum nutrient availability & yield</td></tr>
          <tr><td>7.1 – 8.0</td><td><span className="rm-badge rm-badge-yellow">Alkaline</span></td><td>Iron & Zinc deficiency</td></tr>
          <tr><td>Above 8.0</td><td><span className="rm-badge rm-badge-red">Too Alkaline</span></td><td>Severe micronutrient lockout</td></tr>
        </tbody>
      </table>

      <p className="rm-section-title">✅ Before You Plant Checklist</p>
      <ul className="rm-checklist">
        <li>Collect soil samples from 10+ spots across the field, 20 cm deep</li>
        <li>Send to your county agricultural lab or use a home pH test kit</li>
        <li>Apply agricultural lime 4–6 weeks before planting if pH is below 5.8</li>
        <li>Incorporate 2–3 tonnes of compost per acre during land preparation</li>
        <li>Avoid planting in areas with hardpan — break it with sub-soiling</li>
      </ul>

      <div className="rm-tip">
        <strong>💡 Pro Tip</strong>
        Get a full soil analysis (NPK + micronutrients) every 2–3 seasons.
        In Kenya, KARI and county agriculture offices offer subsidised soil testing.
      </div>
    </>
  );
}

/* ============================================================
   IRRIGATION CONTENT
   ============================================================ */
function IrrigationContent() {
  return (
    <>
      <div className="rm-card-grid">
        <div className="rm-card">
          <div className="rm-card-icon">🌧️</div>
          <h4>Total Water Needed</h4>
          <p>Maize requires <strong>500 – 800 mm</strong> of water over its growing cycle (~90–120 days).</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">⚠️</div>
          <h4>Critical Stages</h4>
          <p>Never allow drought stress at <strong>tasselling & silking</strong> — it can cut yield by 40–60%.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🌡️</div>
          <h4>Evapotranspiration</h4>
          <p>In hot dry spells, apply <strong>40–50 mm/week</strong>. Reduce by 30% during cool seasons.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🕐</div>
          <h4>Best Time to Water</h4>
          <p>Early morning (5–9 AM) reduces evaporation loss and lowers risk of leaf diseases.</p>
        </div>
      </div>

      <p className="rm-section-title">📅 Irrigation Schedule by Growth Stage</p>
      <table className="rm-table">
        <thead>
          <tr>
            <th>Growth Stage</th>
            <th>Days After Planting</th>
            <th>Water Frequency</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Germination</td><td>0 – 10</td><td>Every 2–3 days</td><td><span className="rm-badge rm-badge-green">High</span></td></tr>
          <tr><td>Seedling</td><td>10 – 25</td><td>Every 3–4 days</td><td><span className="rm-badge rm-badge-green">High</span></td></tr>
          <tr><td>Vegetative</td><td>25 – 55</td><td>Every 5–7 days</td><td><span className="rm-badge rm-badge-yellow">Medium</span></td></tr>
          <tr><td>Tasselling / Silking</td><td>55 – 75</td><td>Every 2–3 days</td><td><span className="rm-badge rm-badge-red">Critical</span></td></tr>
          <tr><td>Grain Fill</td><td>75 – 100</td><td>Every 4–5 days</td><td><span className="rm-badge rm-badge-green">High</span></td></tr>
          <tr><td>Maturation</td><td>100 – 120</td><td>Stop or once/week</td><td><span className="rm-badge rm-badge-yellow">Low</span></td></tr>
        </tbody>
      </table>

      <p className="rm-section-title">🚿 Irrigation Methods Compared</p>
      <ul className="rm-checklist">
        <li>Drip irrigation — most water-efficient, reduces disease, ideal for small plots</li>
        <li>Furrow irrigation — best for flat land, low cost, suits large-scale farming</li>
        <li>Sprinkler irrigation — good coverage, mimics rainfall, higher initial cost</li>
        <li>Flood irrigation — lowest efficiency, avoid in areas with poor drainage</li>
      </ul>

      <div className="rm-tip">
        <strong>💡 Drought Warning Signs</strong>
        Leaf rolling or purpling of stems in the afternoon means the plant is under
        water stress. Irrigate immediately — especially during flowering.
      </div>
    </>
  );
}

/* ============================================================
   FERTILIZER GUIDE CONTENT
   ============================================================ */
function FertilizerContent() {
  return (
    <>
      <div className="rm-card-grid">
        <div className="rm-card">
          <div className="rm-card-icon">🟢</div>
          <h4>Nitrogen (N)</h4>
          <p>The most critical nutrient for maize — drives leafy growth and grain protein. Apply in split doses.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🟠</div>
          <h4>Phosphorus (P)</h4>
          <p>Essential for root development and early vigor. Apply all P at planting — it doesn't move in soil.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🔵</div>
          <h4>Potassium (K)</h4>
          <p>Improves stalk strength, drought tolerance, and disease resistance. Apply at planting.</p>
        </div>
        <div className="rm-card">
          <div className="rm-card-icon">🟡</div>
          <h4>Zinc (Zn)</h4>
          <p>Often deficient in Kenyan soils. Apply 5–10 kg ZnSO₄/acre if white striping appears on leaves.</p>
        </div>
      </div>

      <p className="rm-section-title">📊 Recommended Fertilizer Schedule (per acre)</p>
      <table className="rm-table">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Fertilizer</th>
            <th>Rate</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>At planting</td><td>DAP (18:46:0)</td><td>50 kg/acre</td><td>Root development & P supply</td></tr>
          <tr><td>At planting</td><td>NPK (17:17:17)</td><td>50 kg/acre</td><td>Balanced baseline nutrients</td></tr>
          <tr><td>4–5 weeks (V4–V6)</td><td>CAN or Urea</td><td>50 kg/acre</td><td>Vegetative growth boost</td></tr>
          <tr><td>6–8 weeks (V8–V10)</td><td>CAN top-dress</td><td>25 kg/acre</td><td>Support tasselling & grain fill</td></tr>
          <tr><td>Any stage</td><td>Foliar (micronutrients)</td><td>As labeled</td><td>Correct deficiencies fast</td></tr>
        </tbody>
      </table>

      <p className="rm-section-title">🌿 Organic Alternatives</p>
      <ul className="rm-checklist">
        <li>Farm Yard Manure (FYM) — apply 5–10 tonnes/acre, improves long-term soil health</li>
        <li>Compost — 3–5 tonnes/acre, slow-release nutrients and moisture retention</li>
        <li>Biochar — improves nutrient retention in sandy soils, long-lasting</li>
        <li>Legume intercropping (e.g. beans) — fixes atmospheric nitrogen for free</li>
      </ul>

      <div className="rm-tip">
        <strong>💡 Golden Rule of Fertilizer Application</strong>
        Always split nitrogen applications. Applying all N at once risks leaching,
        especially on sandy soils with heavy rainfall. A 50-30-20 split across
        planting, kneeheight, and tasselling stages maximizes efficiency.
      </div>
    </>
  );
}

/* ============================================================
   YIELD CALCULATOR
   ============================================================ */
function YieldCalculator() {
  const [form, setForm] = useState({
    area: '',
    unit: 'acres',
    variety: 'hybrid',
    management: 'good',
    irrigation: 'rainfed',
  });
  const [result, setResult] = useState(null);

  const YIELD_TABLE = {
    // [variety][management][irrigation] => bags/acre (90kg bags)
    hybrid:    { poor: { rainfed: 12, irrigated: 20 }, good: { rainfed: 22, irrigated: 35 }, excellent: { rainfed: 30, irrigated: 45 } },
    opv:       { poor: { rainfed: 8,  irrigated: 14 }, good: { rainfed: 16, irrigated: 26 }, excellent: { rainfed: 22, irrigated: 34 } },
    traditional:{ poor: { rainfed: 5,  irrigated: 9  }, good: { rainfed: 10, irrigated: 16 }, excellent: { rainfed: 14, irrigated: 22 } },
  };

  const VARIETY_LABELS = { hybrid: 'Hybrid (H614D, DK8031)', opv: 'OPV (Katumani, Makueni)', traditional: 'Local/Traditional' };
  const MANAGEMENT_LABELS = { poor: 'Poor', good: 'Good', excellent: 'Excellent' };

  function calculate() {
    const area = parseFloat(form.area);
    if (!area || area <= 0) { alert('Please enter a valid area.'); return; }

    const areaInAcres = form.unit === 'hectares' ? area * 2.471 : area;
    const bagsPerAcre = YIELD_TABLE[form.variety][form.management][form.irrigation];
    const totalBags = Math.round(areaInAcres * bagsPerAcre);
    const kgs = totalBags * 90;
    const tonnes = (kgs / 1000).toFixed(1);

    setResult({ totalBags, kgs, tonnes, bagsPerAcre, areaInAcres: areaInAcres.toFixed(2) });
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setResult(null);
  }

  return (
    <div className="rm-calculator">
      <div className="rm-form-row">
        <div className="rm-form-group">
          <label htmlFor="calc-area">Plot Size</label>
          <input
            id="calc-area"
            type="number"
            name="area"
            min="0.1"
            step="0.1"
            placeholder="e.g. 2.5"
            value={form.area}
            onChange={handleChange}
          />
        </div>
        <div className="rm-form-group">
          <label htmlFor="calc-unit">Unit</label>
          <select id="calc-unit" name="unit" value={form.unit} onChange={handleChange}>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
          </select>
        </div>
      </div>

      <div className="rm-form-row">
        <div className="rm-form-group">
          <label htmlFor="calc-variety">Maize Variety</label>
          <select id="calc-variety" name="variety" value={form.variety} onChange={handleChange}>
            {Object.entries(VARIETY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="rm-form-group">
          <label htmlFor="calc-irrigation">Water Source</label>
          <select id="calc-irrigation" name="irrigation" value={form.irrigation} onChange={handleChange}>
            <option value="rainfed">Rain-fed</option>
            <option value="irrigated">Irrigated</option>
          </select>
        </div>
      </div>

      <div className="rm-form-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="rm-form-group">
          <label htmlFor="calc-management">Farm Management Level</label>
          <select id="calc-management" name="management" value={form.management} onChange={handleChange}>
            <option value="poor">Poor (no fertilizer, no spacing)</option>
            <option value="good">Good (basic fertilizer & spacing)</option>
            <option value="excellent">Excellent (full best practices)</option>
          </select>
        </div>
      </div>

      <button className="rm-calc-btn" onClick={calculate}>
        📊 Calculate My Estimated Yield
      </button>

      {result && (
        <div className="rm-result-box">
          <p className="rm-result-label">Estimated Yield</p>
          <p className="rm-result-value">{result.totalBags}</p>
          <p className="rm-result-unit">× 90 kg bags = {result.kgs.toLocaleString()} kg ({result.tonnes} tonnes)</p>
          <p className="rm-result-breakdown">
            Area: {result.areaInAcres} acres &nbsp;·&nbsp;
            ~{result.bagsPerAcre} bags/acre &nbsp;·&nbsp;
            {form.management.charAt(0).toUpperCase() + form.management.slice(1)} management
          </p>
        </div>
      )}

      <div className="rm-tip" style={{ marginTop: '1.2rem' }}>
        <strong>⚠️ Disclaimer</strong>
        These estimates are based on regional averages. Actual yields depend on weather,
        soil quality, pest pressure, and farm inputs. Always consult your local agriculture
        extension officer for field-specific advice.
      </div>
    </div>
  );
}
