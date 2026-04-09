import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { KENYA_LOCATIONS } from '../../data/kenyaData';
import './Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    county: '',
    subCounty: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, phone, county, subCounty, password } = formData;
    
    if (!username || !email || !phone || !county || !subCounty || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!auth || !db) {
      setError("Database is not connected. Please check API keys.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save custom data to Firestore 'users' collection
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        username: username,
        phone: phone,
        county: county,
        subCounty: subCounty,
        location: `${subCounty}, ${county}`, // keep legacy location for compatibility
        role: 'farmer', // default role
        createdAt: new Date().toISOString()
      });

      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("An account with this email already exists.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join the Maize Farming Community</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" onChange={handleChange} placeholder="e.g. SamuelK" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" onChange={handleChange} placeholder="samuel@example.com" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" type="text" onChange={handleChange} placeholder="07XX XXX XXX" />
          </div>
          <div className="form-group">
            <label>County</label>
            <div className="custom-select-wrapper">
              <select 
                name="county" 
                value={formData.county} 
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData(prev => ({ ...prev, county: val, subCounty: '' }));
                }}
                className="auth-select"
              >
                <option value="">-- Select County --</option>
                {Object.keys(KENYA_LOCATIONS).sort().map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Sub-County</label>
            <div className="custom-select-wrapper">
              <select 
                name="subCounty" 
                value={formData.subCounty} 
                onChange={handleChange}
                className="auth-select"
                disabled={!formData.county}
              >
                <option value="">-- Select Sub-County --</option>
                {formData.county && KENYA_LOCATIONS[formData.county] && KENYA_LOCATIONS[formData.county].map(sc => (
                  <option key={sc} value={sc}>{sc}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group password-group">
            <label>Password</label>
            <div className="input-with-icon">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                onChange={handleChange} 
                placeholder="Min. 6 characters" 
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <button type="submit" className="cp-btn primary auth-btn" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <NavLink to="/login">Log in</NavLink>
        </div>
      </div>
    </div>
  );
}
