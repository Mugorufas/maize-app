import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import './CropCalendar.css';

export const MATURITY_TYPES = {
  early: { label: 'Early Maturing (110 days)', duration: 110, id: 'early' },
  medium: { label: 'Medium Maturing (130 days)', duration: 130, id: 'medium' },
  late: { label: 'Late Maturing (150 days)', duration: 150, id: 'late' }
};

const CropCalendar = () => {
  const { currentUser, userData } = useAuth();
  const [plantingDate, setPlantingDate] = useState('');
  const [maturityType, setMaturityType] = useState('medium');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userData?.farmData) {
      // Only set initial values if current state is empty to avoid overwriting 
      // unsaved changes while the user is typing
      setPlantingDate(prev => prev || userData.farmData.plantingDate || '');
      setMaturityType(prev => (prev === 'medium' && userData.farmData.maturityType) ? userData.farmData.maturityType : prev);
    }
  }, [userData]);

  const handleSave = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        farmData: {
          plantingDate,
          maturityType,
          lastUpdated: new Date().toISOString()
        }
      });
      setMessage('✅ Farm configuration saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Error saving data.');
    }
    setIsSaving(false);
  };

  const calculateMilestones = () => {
    if (!plantingDate) return [];
    
    const start = new Date(plantingDate);
    const totalDays = MATURITY_TYPES[maturityType].duration;
    
    // Scale milestones based on total duration
    // Standardizing relative to a 120-day crop
    const scale = totalDays / 120;

    const milestones = [
      { name: 'Emergence', day: 7 * scale, icon: '🌱', advice: 'Watch for uniform emergence. Control early weeds.' },
      { name: 'V6 Stage (Knee High)', day: 35 * scale, icon: '🌿', advice: 'Critical time for Topdressing (Nitrogen) application.' },
      { name: 'V12 Stage', day: 55 * scale, icon: '📏', advice: 'Rapid growth. Ensure steady water supply.' },
      { name: 'Tasseling & Silking', day: 70 * scale, icon: '🌽', advice: 'Peak water demand. Drought now reduces yield by 50%.' },
      { name: 'Milk Stage', day: 90 * scale, icon: '🥛', advice: 'Grain filling. Protect from pests like Fall Armyworm.' },
      { name: 'Physiological Maturity', day: totalDays, icon: '🚜', advice: 'Harvest ready. Check for the black layer on kernels.' }
    ];

    return milestones.map(m => {
      const milestoneDate = new Date(start);
      milestoneDate.setDate(start.getDate() + m.day);
      
      const today = new Date();
      const status = today > milestoneDate ? 'past' : 
                     (today.toDateString() === milestoneDate.toDateString() ? 'today' : 'future');

      return { ...m, date: milestoneDate, status };
    });
  };

  const milestones = calculateMilestones();
  const today = new Date();
  
  // Find current stage
  const currentStage = [...milestones].reverse().find(m => today >= m.date) || { name: 'Pre-planting', advice: 'Prepare your land and select certified seeds.' };

  return (
    <div className="calendar-container">
      <div className="calendar-header-glass">
        <h1>My Personalized Crop Calendar</h1>
        <p>Expert-guided milestones based on your specific planting timeline.</p>
      </div>

      <div className="calendar-setup-grid">
        <div className="glass-card setup-card">
          <h3>Farm Configuration</h3>
          <div className="form-group">
            <label>Planting Date</label>
            <input 
              type="date" 
              value={plantingDate} 
              onChange={(e) => setPlantingDate(e.target.value)}
              className="calendar-input"
            />
          </div>
          <div className="form-group">
            <label>Maize Variety Type</label>
            <select 
              value={maturityType} 
              onChange={(e) => setMaturityType(e.target.value)}
              className="calendar-select"
            >
              {Object.values(MATURITY_TYPES).map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
          <button 
            className="save-btn" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
          {message && <p className="status-msg">{message}</p>}
        </div>

        <div className="glass-card status-card">
          <h3>Current Status</h3>
          <div className="current-badge">
            <span className="badge-icon">{currentStage.icon || '📍'}</span>
            <div className="badge-text">
              <h4>{currentStage.name}</h4>
              <p>{currentStage.advice}</p>
            </div>
          </div>
        </div>
      </div>

      {!plantingDate ? (
        <div className="empty-state">
          <p>Please enter your planting date to view your personalized timeline.</p>
        </div>
      ) : (
        <div className="timeline-wrapper">
          <div className="timeline-track"></div>
          {milestones.map((m, idx) => (
            <div key={idx} className={`timeline-item ${m.status}`}>
              <div className="timeline-marker">
                <span className="marker-icon">{m.icon}</span>
              </div>
              <div className="timeline-content glass-card">
                <span className="milestone-date">{m.date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <h4>{m.name}</h4>
                <p>{m.advice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropCalendar;
