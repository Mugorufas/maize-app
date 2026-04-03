import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlantingGuide from './components/PlantingGuide';
import CareGuide from './components/CareGuide';
import HarvestGuide from './components/HarvestGuide';
import PestGuide from './components/PestGuide';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planting" element={<PlantingGuide />} />
          <Route path="/care" element={<CareGuide />} />
          <Route path="/harvest" element={<HarvestGuide />} />
          <Route path="/pests" element={<PestGuide />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
