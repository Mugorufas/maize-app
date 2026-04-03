import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page-container">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Talk to us to learn more information, for more insights on your plantation and plots. With Maize Farming Guide, use to keep your agricultural goals in your hands.</p>
      </div>

      <div className="contact-grid">
        <div className="glass-card contact-form">
          <h2>Contact Form</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        <div className="glass-card contact-info">
          <h2>Contact Info</h2>
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <strong>Email</strong>
              <p>mugorufas072@gmail.com</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <strong>Phone</strong>
              <p>+254 792 560 641</p>
            </div>
          </div>
          <button className="whatsapp-btn">
            <span className="whatsapp-icon">💬</span> WhatsApp
          </button>
        </div>
      </div>

      <div className="location-card">
        <div className="location-info">
          <span className="location-pin">📍</span>
          <p>Maize Farming Agricultural. Contact +254 792 560 641</p>
        </div>
        <div className="location-map">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" alt="Map Location" />
        </div>
      </div>

      <div className="social-links">
        <a href="#" className="social-icon">f</a>
        <a href="#" className="social-icon">t</a>
        <a href="#" className="social-icon">in</a>
        <a href="#" className="social-icon">ig</a>
      </div>
    </div>
  );
};

export default ContactPage;
