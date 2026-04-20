import React, { useState, useRef } from 'react';
import './ContactPage.css';

const PHONE = '+254792560641';
const WHATSAPP_NUMBER = '254792560641';
const EMAIL = 'ndabarufas@gmail.com';

const ContactPage = () => {
  const formRef = useRef();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  /* ---------- Validation ---------- */
  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  /* ---------- Submit → background sending via FormSubmit ---------- */
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');

    try {
      // FormSubmit.co is a zero-config backend for forms.
      // The first time a message is sent, you will receive an activation email at ndabarufas@gmail.com
      // Once activated, all subsequent messages will be delivered directly to your inbox.
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Message: ${form.subject}`, // FormSubmit special subject field
          _replyto: form.email, // Allows you to hit 'Reply' directly to the sender's email
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  /* ---------- WhatsApp ---------- */
  function openWhatsApp() {
    const msg = encodeURIComponent('Hello! I found you through the Maize Farming Guide. I would like to learn more.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  return (
    <div className="contact-page-container" data-readable="true">
      {/* Hero */}
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>
          Have a question about planting, pests, or improving your yield?
          Reach out and our team will respond as quickly as possible.
        </p>
      </div>

      {/* Main Grid */}
      <div className="contact-grid">

        {/* --- Contact Form --- */}
        <div className="glass-card contact-form">
          <h2>Send a Message</h2>

          {status === 'success' && (
            <div className="form-feedback success">
              <span>✅</span>
              <div>
                <strong>Message sent!</strong>
                <p>Thanks for reaching out! We'll reply to your email within 24 hours.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="form-feedback error">
              <span>❌</span>
              <div>
                <strong>Something went wrong.</strong>
                <p>Please try emailing us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="What is your message about?"
                value={form.subject}
                onChange={handleChange}
              />
              {errors.subject && <span className="field-error">{errors.subject}</span>}
            </div>

            <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <><span className="spinner" /> Sending…</>
              ) : (
                '✉️ Send Message'
              )}
            </button>
          </form>
        </div>

        {/* --- Contact Info --- */}
        <div className="glass-card contact-info">
          <h2>Contact Info</h2>

          <a href={`mailto:${EMAIL}`} className="info-item info-link">
            <span className="info-icon">✉️</span>
            <div>
              <strong>Email Us</strong>
              <p>{EMAIL}</p>
            </div>
            <span className="info-arrow">→</span>
          </a>

          <a href={`tel:${PHONE}`} className="info-item info-link">
            <span className="info-icon">📞</span>
            <div>
              <strong>Call Us</strong>
              <p>{PHONE}</p>
            </div>
            <span className="info-arrow">→</span>
          </a>

          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <strong>Location</strong>
              <p>Kirinyaga County, Kenya</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">🕐</span>
            <div>
              <strong>Working Hours</strong>
              <p>Mon – Sat: 7:00 AM – 6:00 PM</p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <button className="whatsapp-btn" onClick={openWhatsApp}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </button>

          {/* Social Icons */}
          <div className="social-row">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="location-card">
        <div className="location-info">
          <span className="location-pin">📍</span>
          <h3>Find Us</h3>
          <p>Kirinyaga County, Kenya</p>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Serving farmers across the Mt. Kenya region and beyond.
          </p>
          <a
            href="https://www.google.com/maps/place/Kirinyaga+County"
            target="_blank"
            rel="noopener noreferrer"
            className="map-open-btn"
          >
            Open in Google Maps ↗
          </a>
        </div>
        <div className="location-map">
          <iframe
            title="Kirinyaga County Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19587522947!2d37.30715!3d-0.658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182979e2df9f7b19%3A0x6b8c77cf97ee2b64!2sKirinyaga+County!5e0!3m2!1sen!2ske!4v1680000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
