import React, { useState, useRef, useEffect } from 'react';
import { getGeminiVisionResponse, getGeminiChatResponse } from '../../utils/aiService';
import {
  loadScans,
  saveScan,
  deleteScan as deleteScanFromDB,
  uploadScanImage,
} from '../../utils/scanHistoryService';
import { useAuth } from '../../context/AuthContext';
import './AIPestScanner.css';

const AIPestScanner = () => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const chatMessagesEndRef = useRef(null);

  const [scans, setScans] = useState([]);
  const [currentScanId, setCurrentScanId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const currentScan = scans.find((s) => s.id === currentScanId);
  // `image` is base64 for new uploads, or imageUrl (Storage URL) for loaded scans
  const image = currentScan?.image || currentScan?.imageUrl || null;
  const diagnosisResult = currentScan?.diagnosisResult || '';
  const chatHistory = currentScan?.chatHistory || [];

  // ─── Load scan history ────────────────────────────────────────────────────
  useEffect(() => {
    const initScans = async () => {
      if (currentUser) {
        setIsLoadingHistory(true);
        const firestoreScans = await loadScans(currentUser.uid);
        if (firestoreScans && firestoreScans.length > 0) {
          setScans(firestoreScans);
          // Don't auto-select — user picks from history panel
        }
        setIsLoadingHistory(false);
      } else {
        // Guest → localStorage
        const saved = localStorage.getItem('maize_pest_scans');
        if (saved) {
          try {
            setScans(JSON.parse(saved));
          } catch { /* ignore */ }
        }
      }
    };
    initScans();
  }, [currentUser]);

  // ─── Guest localStorage sync ───────────────────────────────────────────────
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('maize_pest_scans', JSON.stringify(scans));
    }
  }, [scans, currentUser]);

  // ─── Auto-scroll chat ──────────────────────────────────────────────────────
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatTyping]);

  // ─── New scan ──────────────────────────────────────────────────────────────
  const startNewScan = () => {
    setCurrentScanId(null);
    setShowHistory(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ─── Image upload ──────────────────────────────────────────────────────────
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('Image too large (max 4MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64DataUrl = reader.result;
      const newScanId = Date.now().toString();

      // Create a local scan immediately using base64 so the UI is responsive
      const newScan = {
        id: newScanId,
        timestamp: Date.now(),
        image: base64DataUrl,   // local only — stripped before Firestore write
        imageUrl: null,         // will be filled after upload
        diagnosisResult: '',
        chatHistory: [],
        error: '',
        title: 'New Scan',
      };

      setScans((prev) => [newScan, ...prev]);
      setCurrentScanId(newScanId);

      // If logged in, upload image to Firebase Storage
      if (currentUser) {
        setIsUploadingImage(true);
        const imageUrl = await uploadScanImage(currentUser.uid, newScanId, base64DataUrl);
        if (imageUrl) {
          setScans((prev) =>
            prev.map((s) => (s.id === newScanId ? { ...s, imageUrl } : s))
          );
        }
        setIsUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // ─── Analyze image ─────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!image || isAnalyzing) return;
    setIsAnalyzing(true);
    setScans((prev) =>
      prev.map((s) => (s.id === currentScanId ? { ...s, diagnosisResult: '', error: '' } : s))
    );

    try {
      const response = await getGeminiVisionResponse(image);
      const title = `Scan ${new Date(currentScan.timestamp).toLocaleDateString()} - ${response
        .split('\n')[0]
        .substring(0, 30)}...`;

      const updatedScan = {
        ...currentScan,
        diagnosisResult: response,
        chatHistory: [],
        title,
      };

      setScans((prev) =>
        prev.map((s) => (s.id === currentScanId ? updatedScan : s))
      );

      // Save to Firestore if logged in (base64 image stripped inside saveScan)
      if (currentUser) {
        saveScan(currentUser.uid, updatedScan);
      }
    } catch (err) {
      setScans((prev) =>
        prev.map((s) =>
          s.id === currentScanId ? { ...s, error: 'Diagnosis failed. Please try again.' } : s
        )
      );
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ─── Follow-up chat ────────────────────────────────────────────────────────
  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatTyping || !currentScan) return;

    const userMsg = { role: 'user', parts: [{ text: chatInput }] };
    const updatedChatHistory = [...chatHistory, userMsg];

    setScans((prev) =>
      prev.map((s) =>
        s.id === currentScanId ? { ...s, chatHistory: updatedChatHistory } : s
      )
    );
    setChatInput('');
    setIsChatTyping(true);

    const contextPrefix = {
      role: 'user',
      parts: [{ text: `Context - Image diagnosis result: ${diagnosisResult}` }],
    };
    const contextAck = {
      role: 'model',
      parts: [{ text: 'Understood. I have the diagnosis context. Please ask your follow-up questions.' }],
    };
    const fullHistoryForGemini = [
      contextPrefix,
      contextAck,
      ...updatedChatHistory.slice(0, -1),
    ];

    const responseText = await getGeminiChatResponse(fullHistoryForGemini, chatInput);
    const modelMsg = { role: 'model', parts: [{ text: responseText }] };
    const finalChatHistory = [...updatedChatHistory, modelMsg];

    const updatedScan = { ...currentScan, chatHistory: finalChatHistory };
    setScans((prev) =>
      prev.map((s) => (s.id === currentScanId ? updatedScan : s))
    );

    // Persist updated chat history to Firestore
    if (currentUser) {
      saveScan(currentUser.uid, updatedScan);
    }

    setIsChatTyping(false);
  };

  // ─── Delete scan ───────────────────────────────────────────────────────────
  const handleDeleteScan = (e, id) => {
    e.stopPropagation();

    if (currentUser) {
      deleteScanFromDB(currentUser.uid, id);
    }

    const updatedScans = scans.filter((s) => s.id !== id);
    setScans(updatedScans);
    if (currentScanId === id) {
      setCurrentScanId(updatedScans.length > 0 ? updatedScans[0].id : null);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="pest-scanner-card">
      <div className="scanner-header">
        <div className="scanner-title-group">
          <button
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
            title="Scan History"
          >
            {showHistory ? '←' : '🕒'}
          </button>
          <h3>{showHistory ? 'Scan History' : 'Instant Crop Diagnosis'}</h3>
        </div>
        <div className="scanner-actions">
          <button className="new-scan-btn" onClick={startNewScan} title="Start New Scan">
            +
          </button>
        </div>
      </div>

      <p className="scanner-subtitle">
        {showHistory
          ? 'Review past diagnoses or start a new one.'
          : 'Upload a clear photo of your maize plant to identify pests or diseases.'}
      </p>

      {/* Guest login nudge */}
      {!currentUser && (
        <div className="scanner-guest-notice">
          🔒 <a href="/login">Log in</a> to save your scan history across devices
        </div>
      )}

      <div className="scanner-content">
        {showHistory ? (
          <div className="scan-history-panel">
            <button className="start-new-scan-large" onClick={startNewScan}>
              + New Scan
            </button>
            <div className="history-list">
              {isLoadingHistory && (
                <p className="no-history-message">Loading history...</p>
              )}
              {!isLoadingHistory && scans.length === 0 && (
                <p className="no-history-message">No scan history yet. Start a new scan!</p>
              )}
              {!isLoadingHistory && scans.map((scan) => (
                <div
                  key={scan.id}
                  className={`history-item ${scan.id === currentScanId ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScanId(scan.id);
                    setShowHistory(false);
                  }}
                >
                  <span className="scan-title">{scan.title}</span>
                  <button
                    className="delete-scan-btn"
                    onClick={(e) => handleDeleteScan(e, scan.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {!image ? (
              <div
                className="image-upload-zone"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-placeholder">
                  <span className="upload-icon">📸</span>
                  <p>Click to Take Photo or Upload</p>
                  <span className="upload-hint">Supported: JPG, PNG (Max 4MB)</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </div>
            ) : (
              <div className="image-preview-zone">
                <img src={image} alt="Crop to analyze" className="preview-img" />
                {isUploadingImage && (
                  <div className="upload-progress-overlay">☁️ Saving image...</div>
                )}
                {!diagnosisResult && !isAnalyzing && (
                  <div className="preview-overlay">
                    <button className="change-btn" onClick={startNewScan}>
                      Change Photo
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentScan?.error && (
              <div className="scanner-error">⚠️ {currentScan.error}</div>
            )}

            {image && !diagnosisResult && (
              <button
                className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`}
                onClick={handleAnalyze}
                disabled={isAnalyzing || isUploadingImage}
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing Crop...
                  </>
                ) : (
                  '🔍 Start AI Diagnosis'
                )}
              </button>
            )}

            {diagnosisResult && (
              <>
                {/* Box 1: Diagnosis Report — independently scrollable */}
                <div className="scanner-result">
                  <div className="result-header">
                    <h4>Diagnosis Report</h4>
                    <button className="reset-btn" onClick={startNewScan}>New Scan</button>
                  </div>
                  <div className="result-body">
                    {diagnosisResult.split('\n').map((line, i) => (
                      <p
                        key={i}
                        className={line.startsWith('Diagnosis:') ? 'diagnosis-line' : ''}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="result-footer">
                    💡 Consult an expert before applying chemical treatments.
                  </div>
                </div>

                {/* Box 2: Follow-up Chat — independently scrollable, different color */}
                <div className="scanner-chat-interface">
                  <div className="chat-followup-label">💬 Follow-up Questions</div>
                  <div className="chat-messages">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`message-bubble ${msg.role}`}>
                        <div className="bubble-content">{msg.parts[0].text}</div>
                      </div>
                    ))}
                    {isChatTyping && (
                      <div className="message-bubble model typing">
                        <div className="typing-dots">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    )}
                    <div ref={chatMessagesEndRef} />
                  </div>
                  <form className="chat-input-area" onSubmit={handleChatSend}>
                    <input
                      type="text"
                      placeholder="Ask a follow-up question about this diagnosis..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={isChatTyping}
                    />
                    <button type="submit" disabled={!chatInput.trim() || isChatTyping}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AIPestScanner;
