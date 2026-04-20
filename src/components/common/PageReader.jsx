import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useTTS from '../../utils/useTTS';
import './PageReader.css';

// Map route paths to human-readable page names
const PAGE_NAMES = {
  '/': 'Home Page',
  '/planting': 'Planting Guide',
  '/care': 'Care and Maintenance Guide',
  '/harvest': 'Harvesting Guide',
  '/pests': 'Pest and Disease Guide',
  '/community': 'Community Page',
  '/contact': 'Contact Page',
  '/calendar': 'Crop Calendar',
};

const SPEED_OPTIONS = [
  { label: '0.75×', value: 0.75 },
  { label: '1×',    value: 1    },
  { label: '1.25×', value: 1.25 },
  { label: '1.5×',  value: 1.5  },
];

const PageReader = () => {
  const location = useLocation();
  const { speak, stop, pause, resume, isSpeaking, isPaused, rate, setRate, isSupported } = useTTS();

  // Auto-stop when user navigates to a different page
  useEffect(() => {
    stop();
  }, [location.pathname, stop]);

  const pageName = PAGE_NAMES[location.pathname] || 'this page';

  // Pages where the reader makes sense (not auth/admin pages)
  const readableRoutes = Object.keys(PAGE_NAMES);
  const isReadablePage = readableRoutes.includes(location.pathname);

  const handleReadPage = useCallback(() => {
    const readableEl = document.querySelector('[data-readable="true"]');
    if (!readableEl) {
      speak(`Sorry, there is no readable content on ${pageName} yet.`);
      return;
    }
    const text = readableEl.innerText || readableEl.textContent || '';
    speak(text);
  }, [speak, pageName]);

  const handleMainButton = () => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      handleReadPage();
    }
  };

  // Don't render on auth/admin pages or unsupported browsers
  if (!isSupported || !isReadablePage) return null;

  const isActive = isSpeaking || isPaused;

  return (
    <div className={`page-reader-wrapper ${isActive ? 'active' : ''}`}>
      {/* Expanded player bar (shown when active) */}
      {isActive && (
        <div className="page-reader-bar">
          <div className="reader-bar-label">
            <span className="reader-waveform">
              <span></span><span></span><span></span><span></span><span></span>
            </span>
            <span className="reader-page-name">Reading: {pageName}</span>
          </div>
          <div className="reader-bar-controls">
            {/* Speed selector */}
            <div className="speed-selector">
              {SPEED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`speed-btn ${rate === opt.value ? 'active-speed' : ''}`}
                  onClick={() => setRate(opt.value)}
                  title={`Speed ${opt.label}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* Stop button */}
            <button className="reader-stop-btn" onClick={stop} title="Stop reading">
              ⏹
            </button>
          </div>
        </div>
      )}

      {/* Main floating launcher button */}
      <button
        className={`page-reader-launcher ${isActive ? 'speaking' : ''}`}
        onClick={handleMainButton}
        title={
          isPaused ? 'Resume reading' :
          isSpeaking ? 'Pause reading' :
          `Read ${pageName} aloud`
        }
        aria-label="Page Reader"
      >
        {isPaused ? (
          <span className="reader-btn-icon">▶</span>
        ) : isSpeaking ? (
          <span className="reader-btn-icon">⏸</span>
        ) : (
          <span className="reader-btn-icon">🔊</span>
        )}
        {!isActive && <span className="reader-launcher-tooltip">Read Page</span>}
      </button>
    </div>
  );
};

export default PageReader;
