import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
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
      let emailToUse = identifier.trim();

      // If the identifier is not an email, we look it up in the database (Username or Phone)
      if (!emailToUse.includes('@')) {
        const usersRef = collection(db, 'users');
        const qUsername = query(usersRef, where('username', '==', emailToUse));
        const qPhone = query(usersRef, where('phone', '==', emailToUse));
        
        const [unameSnap, phoneSnap] = await Promise.all([getDocs(qUsername), getDocs(qPhone)]);
        
        let foundUser = null;
        if (!unameSnap.empty) foundUser = unameSnap.docs[0];
        else if (!phoneSnap.empty) foundUser = phoneSnap.docs[0];

        if (foundUser) {
          emailToUse = foundUser.data().email;
        } else {
          setError("Account not found with this username or phone number.");
          setLoading(false);
          return;
        }
      }

      await signInWithEmailAndPassword(auth, emailToUse, password);
      // Determine where to redirect based on role (could do it here or let App handle it)
      // We will just redirect to home and let the header show the admin dashboard link.
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError("Invalid credentials. Please try again.");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Log in to post in the community</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email, Phone, or Username</label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. SamuelK or 0712345678"
            />
          </div>
          <div className="form-group password-group">
            <label>Password</label>
            <div className="input-with-icon">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </div>
      </div>
    </div>
  );
}
