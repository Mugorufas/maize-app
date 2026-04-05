import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import ResourceModal from './ResourceModal';

function Footer() {
  const [activeResource, setActiveResource] = useState(null);

  const openResource = (id) => (e) => {
    e.preventDefault();
    setActiveResource(id);
  };

  return (
    <>
      <footer className="footer-container">
        <div className="footer-top">
          <div className="footer-column about">
            <h3 className="footer-logo">Maize Farming Guide</h3>
            <p>
              Dedicated to empowering farmers with professional, research-backed knowledge to master the science of maize cultivation from seed to silo.
            </p>
            <div className="social-links-footer">
              <a href="#" className="social-icon-wrapper" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon-wrapper" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon-wrapper" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 4.5z"></path></svg>
              </a>
              <a href="#" className="social-icon-wrapper" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              <a href="#" className="social-icon-wrapper" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V12.5c0 2.22-.3 4.27-1.57 6.01-1.39 1.91-3.69 3.12-6.03 3.12-2.34 0-4.63-1.21-6.02-3.12-1.27-1.74-1.57-3.79-1.57-6.01s.3-4.27 1.57-6.01c1.39-1.91 3.69-3.12 6.02-3.12 1.34 0 2.6.43 3.64 1.14V.02z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-column links">
            <h4>Quick Access</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/planting">Planting Guide</Link></li>
              <li><Link to="/care">Care &amp; Maintenance</Link></li>
              <li><Link to="/harvest">Harvesting Guide</Link></li>
              <li><Link to="/pests">Pest Defense</Link></li>
            </ul>
          </div>

          <div className="footer-column resources">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#soil" onClick={openResource('soil')}>
                  🪱 Soil Analysis
                </a>
              </li>
              <li>
                <a href="#irrigation" onClick={openResource('irrigation')}>
                  💧 Irrigation Tips
                </a>
              </li>
              <li>
                <a href="#fertilizer" onClick={openResource('fertilizer')}>
                  🌱 Fertilizer Guide
                </a>
              </li>
              <li>
                <a href="#calculator" onClick={openResource('calculator')}>
                  🧮 Yield Calculator
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column contact-footer">
            <h4>Get In Touch</h4>
            <p>📍 Kirinyaga County, Kenya</p>
            <p>📞 +254 792 560 641</p>
            <p>📧 ndabarufas@gmail.com</p>
            <Link to="/contact" className="footer-contact-btn">Contact Us</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Maize Farming Guide. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Resource Modals — rendered outside footer to escape stacking context */}
      {activeResource && (
        <ResourceModal
          resourceId={activeResource}
          onClose={() => setActiveResource(null)}
        />
      )}
    </>
  );
}

export default Footer;
