import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MarketTicker from './MarketTicker';
import SearchWidget from './SearchWidget';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, limit, doc } from 'firebase/firestore';
import './Header.css';

function Header({ theme, toggleTheme }) {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!db) return;

    // 1. Listen for Recent Community Posts
    const qPosts = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(5));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      const posts = snapshot.docs.map(d => ({
        id: d.id,
        type: 'community',
        title: d.data().title,
        time: d.data().timestamp?.toDate ? d.data().timestamp.toDate() : (d.data().timestamp || new Date()),
        author: d.data().author
      }));
      updateNotifications(posts);
    });

    // 2. Listen for Global Alert changes
    const unsubAlert = onSnapshot(doc(db, 'appConfig', 'globalAlert'), (snapshot) => {
      if (snapshot.exists() && snapshot.data().active) {
        setNotifications(prev => [
          { 
            id: 'global-alert', 
            type: 'alert', 
            title: snapshot.data().message, 
            time: new Date(), 
            priority: true 
          },
          ...prev.filter(n => n.id !== 'global-alert')
        ]);
      }
    });

    return () => {
      unsubPosts();
      unsubAlert();
    };
  }, []);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateNotifications = (newPosts) => {
    setNotifications(prev => {
      const merged = [...newPosts];
      const alert = prev.find(n => n.id === 'global-alert');
      if (alert) merged.unshift(alert);
      
      // Calculate unseen
      const lastCheck = localStorage.getItem('lastNotifCheck') || 0;
      const unseen = merged.filter(n => new Date(n.time).getTime() > lastCheck).length;
      setUnseenCount(unseen);
      
      return merged.slice(0, 6);
    });
  };

  const handleNotifClick = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen) {
      setUnseenCount(0);
      localStorage.setItem('lastNotifCheck', Date.now());
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <>
      <MarketTicker />
      <div className="header-container">
        <div className="top-bar">
          <span className="platform-name">Maize Farming Guide</span>
          <SearchWidget />
          <div className="top-icons">
            {isAdmin && (
               <NavLink to="/admin" title="Admin Dashboard" className="auth-btn-small" style={{ marginRight: '1rem', background: 'var(--primary-color)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', textDecoration: 'none' }}>
                 Admin Panel
               </NavLink>
            )}
            
            {currentUser ? (
              <button 
                onClick={handleLogout} 
                className="auth-btn-small"
                style={{ marginRight: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Log Out
              </button>
            ) : (
              <NavLink to="/login" className="auth-btn-small" style={{ marginRight: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', textDecoration: 'none' }}>
                Log In
              </NavLink>
            )}

            <NavLink to="/community" title="Community Forum" className="icon-link">
              <span className="icon">💬</span>
            </NavLink>
            
            <div className="notification-wrapper" title="Notifications" onClick={handleNotifClick} ref={notifRef}>
              <span className="icon">🔔</span>
              {unseenCount > 0 && <span className="notification-badge">{unseenCount}</span>}
              
              {isNotifOpen && (
                <div className="notification-dropdown">
                  <div className="notif-header">
                    Recent Updates
                  </div>
                  <div className="notif-content">
                    {notifications.length === 0 ? (
                      <div className="notif-item empty">No new notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`notif-item ${n.type}`} onClick={() => n.type === 'community' && navigate('/community')}>
                          <span className="notif-icon">{n.type === 'alert' ? '🚨' : '💬'}</span>
                          <div className="notif-text">
                            <p className="notif-title">{n.title}</p>
                            <span className="notif-time">{n.type === 'alert' ? 'Urgent' : n.author}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hero-section">
          <h1>Maize Farming Guide</h1>
          <div className="nav-pill">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>Home</NavLink>
            <NavLink to="/planting" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Planting</NavLink>
            <NavLink to="/care" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Care</NavLink>
            <NavLink to="/harvest" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Harvest</NavLink>
            <NavLink to="/pests" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Pests</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Contact</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

