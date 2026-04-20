import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlantingGuide from './components/PlantingGuide';
import CareGuide from './components/CareGuide';
import HarvestGuide from './components/HarvestGuide';
import PestGuide from './components/PestGuide';
import ContactPage from './components/ContactPage';
import CommunityPage from './components/CommunityPage';
import Footer from './components/Footer';

import HomePage from './components/HomePage';
import CropCalendar from './components/CropCalendar';
import GlobalAlert from './components/common/GlobalAlert';
import ScrollToTop from './components/common/ScrollToTop';

// Auth and Admin
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminDashboard from './components/admin/AdminDashboard';

import AIChatbot from './components/common/AIChatbot';
import PageReader from './components/common/PageReader';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <GlobalAlert />
          <AIChatbot />
          <PageReader />
          <Header theme={theme} toggleTheme={toggleTheme} />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planting" element={<PlantingGuide />} />
            <Route path="/care" element={<CareGuide />} />
            <Route path="/harvest" element={<HarvestGuide />} />
            <Route path="/pests" element={<PestGuide />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/community" element={<CommunityPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/calendar" element={<CropCalendar />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
