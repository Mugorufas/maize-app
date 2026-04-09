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
  weather: {
    id: 'weather',
    icon: '🌤️',
    title: 'Weather Guide',
    subtitle: 'Climate conditions and optimal planting windows',
    render: () => <WeatherContent />,
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

    // Calculate Inputs
    const seedsKg = Math.ceil(areaInAcres * 10);
    const seedPackets = Math.ceil(seedsKg / 2); // 2kg packets
    const basalBags = Math.ceil(areaInAcres * 1); // 50kg bags
    const topdressBags = Math.ceil(areaInAcres * 1); // 50kg bags

    setResult({ 
      totalBags, kgs, tonnes, bagsPerAcre, 
      areaInAcres: areaInAcres.toFixed(2),
      inputs: {
        seedsKg,
        seedPackets,
        basalBags,
        topdressBags
      }
    });
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
        📊 Calculate My Estimated Yield & Inputs
      </button>

      {result && (
        <>
          <div className="rm-result-box">
            <p className="rm-result-label">Estimated Yield</p>
            <p className="rm-result-value">{result.totalBags}</p>
            <p className="rm-result-unit">× 90kg bags = {result.kgs.toLocaleString()} kg ({result.tonnes} tonnes)</p>
            <p className="rm-result-breakdown">
              Area: {result.areaInAcres} acres &nbsp;·&nbsp;
              ~{result.bagsPerAcre} bags/acre &nbsp;·&nbsp;
              {form.management.charAt(0).toUpperCase() + form.management.slice(1)} management
            </p>
          </div>

          <div className="rm-result-box rm-input-box">
            <p className="rm-result-label">Estimated Inputs Required</p>
            <div className="rm-input-grid">
              <div className="rm-input-item">
                <span className="rm-input-val">{result.inputs.seedPackets}</span>
                <span className="rm-input-name">Seed Packets (2kg)</span>
              </div>
              <div className="rm-input-item">
                <span className="rm-input-val">{result.inputs.basalBags}</span>
                <span className="rm-input-name">Basal Fertilizer (50kg)</span>
              </div>
              <div className="rm-input-item">
                <span className="rm-input-val">{result.inputs.topdressBags}</span>
                <span className="rm-input-name">Top-dress CAN (50kg)</span>
              </div>
            </div>
            <p className="rm-result-breakdown">Based on standard agronomic rates for {result.areaInAcres} acres.</p>
          </div>
        </>
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

/* ============================================================
   WEATHER GUIDE CONTENT
   ============================================================ */
const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Moderate drizzle', icon: '🌦️' },
  55: { label: 'Dense drizzle', icon: '🌦️' },
  56: { label: 'Light freezing drizzle', icon: '🌧️' },
  57: { label: 'Dense freezing drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌧️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  66: { label: 'Light freezing rain', icon: '🌧️' },
  67: { label: 'Heavy freezing rain', icon: '🌧️' },
  71: { label: 'Slight snow fall', icon: '🌨️' },
  73: { label: 'Moderate snow fall', icon: '🌨️' },
  75: { label: 'Heavy snow fall', icon: '🌨️' },
  77: { label: 'Snow grains', icon: '🌨️' },
  80: { label: 'Slight rain showers', icon: '🌧️' },
  81: { label: 'Moderate rain showers', icon: '🌧️' },
  82: { label: 'Violent rain showers', icon: '🌧️' },
  85: { label: 'Slight snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '🌨️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm & hail', icon: '⛈️' },
  99: { label: 'Heavy thunderstorm & hail', icon: '⛈️' },
};

function WeatherContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('Locating...');

  useEffect(() => {
    // Attempt geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation failed, using default (Nairobi):", err);
          fetchWeather(-1.2921, 36.8219); // Nairobi fallback
        }
      );
    } else {
      fetchWeather(-1.2921, 36.8219); // Nairobi fallback
    }

    async function fetchWeather(lat, lon) {
      try {
        setLoading(true);
        // Try to get location name
        try {
          const locRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          if (locRes.ok) {
            const locData = await locRes.json();
            const city = locData.address.city || locData.address.town || locData.address.village || locData.address.county || 'Your Location';
            const country = locData.address.country || 'Kenya';
            setLocationName(`${city}, ${country}`);
          } else {
            setLocationName('Your Location');
          }
        } catch (e) {
          setLocationName('Your Location');
        }

        // Fetch weather from open-meteo
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode,precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7&timezone=auto`);
        
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="rm-weather-loading">
        <div className="rm-weather-spinner"></div>
        <p>Fetching local weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rm-weather-error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()} className="rm-calc-btn">Try Again</button>
      </div>
    );
  }

  if (!weather || !weather.current_weather) return null;

  const current = weather.current_weather;
  const currentCode = WEATHER_CODES[current.weathercode] || { label: 'Unknown', icon: '🌡️' };
  
  const daily = weather.daily;
  const hourly = weather.hourly;

  // 1. Dynamic Background based on current weather
  let bgGradient = 'linear-gradient(to bottom right, #2ab1e6, #1461bd)'; // Default clear
  if ([0, 1].includes(current.weathercode)) bgGradient = 'linear-gradient(to bottom right, #f59e0b, #ea580c)'; // Sunny/Warm
  if ([2, 3].includes(current.weathercode)) bgGradient = 'linear-gradient(to bottom right, #94a3b8, #475569)'; // Cloudy
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(current.weathercode)) bgGradient = 'linear-gradient(to bottom right, #64748b, #1e293b)'; // Rainy
  if ([95,96,99].includes(current.weathercode)) bgGradient = 'linear-gradient(to bottom right, #334155, #0f172a)'; // Thunderstorm

  // 2. Safe to Plant logic (check next 3 days average rain probability)
  const next3DaysPrecip = daily.precipitation_probability_max ? daily.precipitation_probability_max.slice(0, 3) : [0,0,0];
  const avgPrecip = next3DaysPrecip.reduce((a,b)=>a+b, 0) / 3;
  const isSafeToPlant = avgPrecip >= 50;

  // 3. Hourly Forecast (next 24 hours)
  const now = new Date();
  const hourlyStartIndex = hourly.time.findIndex(t => new Date(t) >= now);
  const next24Hours = hourlyStartIndex !== -1 ? hourly.time.slice(hourlyStartIndex, hourlyStartIndex + 24) : [];

  // Format dates e.g. "Mon, 12"
  const formatDateDay = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  return (
    <div className="rm-weather-widget">
      <div className="rm-weather-header" style={{ background: bgGradient }}>
        
        {/* Smart Planting Indicator */}
        <div style={{ marginBottom: '1.2rem' }}>
          {isSafeToPlant ? (
            <span className="rm-badge" style={{ background: 'rgba(34, 197, 94, 0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '5px 12px' }}>
               ✅ Safe to Plant (Good Rain Expected)
            </span>
          ) : (
            <span className="rm-badge" style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '5px 12px' }}>
               🛑 Wait for Rain (Dry Spell Ahead)
            </span>
          )}
        </div>

        <div className="rm-wh-top">
          <h3>📍 {locationName}</h3>
          <span className="rm-wh-status">{currentCode.label}</span>
        </div>
        <div className="rm-wh-main">
          <div className="rm-wh-icon animated-weather-icon">{currentCode.icon}</div>
          <div className="rm-wh-temp">{Math.round(current.temperature)}°</div>
        </div>

        {/* 24 Hour Forecast Carousel */}
        {next24Hours.length > 0 && (
          <div className="rm-hourly-container">
            {next24Hours.map((time, i) => {
              const idx = hourlyStartIndex + i;
              const hCode = WEATHER_CODES[hourly.weathercode[idx]] || { icon: '🌡️' };
              const hTemp = Math.round(hourly.temperature_2m[idx]);
              const hTime = new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
              return (
                <div key={time} className="rm-hourly-item">
                  <span className="rm-hi-time">{i === 0 ? 'Now' : hTime.replace(' AM', 'am').replace(' PM', 'pm')}</span>
                  <span className="rm-hi-icon">{hCode.icon}</span>
                  <span className="rm-hi-temp">{hTemp}°</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <p className="rm-section-title">📅 7-Day Forecast</p>
      <div className="rm-weather-forecast">
        {daily.time.map((time, idx) => {
          const code = WEATHER_CODES[daily.weathercode[idx]] || { label: 'Unknown', icon: '🌡️' };
          const minT = Math.round(daily.temperature_2m_min[idx]);
          const maxT = Math.round(daily.temperature_2m_max[idx]);
          const precip = daily.precipitation_probability_max ? daily.precipitation_probability_max[idx] : 0;
          
          return (
            <div key={time} className="rm-forecast-day">
              <span className="rm-fd-day" title={time}>{idx === 0 ? 'Today' : formatDateDay(time)}</span>
              <span className="rm-fd-icon" title={code.label}>{code.icon}</span>
              <span className="rm-fd-precip">{precip > 0 ? `${precip}%💧` : ''}</span>
              <div className="rm-fd-temps">
                <span className="rm-fd-min">{minT}°</span>
                <div className="rm-fd-bar">
                  <div className="rm-fd-bar-fill" style={{ width: `${Math.min(100, (maxT - minT) * 10)}%`, marginLeft: 'auto', marginRight: 'auto' }}></div>
                </div>
                <span className="rm-fd-max">{maxT}°</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="rm-tip" style={{ marginTop: '1.2rem' }}>
        <strong>💡 Farming Tip</strong>
        Always wait for consistent rain probability (over 60% for a few consecutive days) before sowing seeds to ensure proper germination without irrigation.
      </div>
    </div>
  );
}

