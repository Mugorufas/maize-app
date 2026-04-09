import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './GlobalAlert.css';

export default function GlobalAlert() {
  const [alert, setAlert] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(doc(db, 'appConfig', 'globalAlert'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setAlert(data);
        // Reset dismissal if text changed
        setIsDismissed(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!alert || !alert.active || isDismissed) return null;

  return (
    <div className={`global-alert-banner ${alert.type || 'warning'}`}>
      <div className="alert-content">
        <span className="alert-icon">{alert.type === 'incident' ? '🚨' : '📢'}</span>
        <p dangerouslySetInnerHTML={{ __html: alert.message }}></p>
      </div>
      <button className="alert-close" onClick={() => setIsDismissed(true)} title="Dismiss">
        &times;
      </button>
    </div>
  );
}
