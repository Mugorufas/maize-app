import React, { useState, useRef } from 'react';
import { getGeminiVisionResponse } from '../../utils/aiService';
import './AIPestScanner.css';

const AIPestScanner = () => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("Image too large (max 4MB)");
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResult(''); // Clear previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setResult('');
    setError('');

    try {
      const response = await getGeminiVisionResponse(image);
      setResult(response);
    } catch (err) {
      setError("Diagnosis failed. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clear = () => {
    setImage(null);
    setResult('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="pest-scanner-card">
      <div className="scanner-header">
        <div className="scanner-title-group">
          <span className="scanner-badge">AI Powered</span>
          <h3>Instant Crop Diagnosis</h3>
        </div>
        <p>Upload a clear photo of your maize plant to identify pests or diseases.</p>
      </div>

      <div className="scanner-content">
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
            {!result && !isAnalyzing && (
              <div className="preview-overlay">
                <button className="change-btn" onClick={clear}>Change Photo</button>
              </div>
            )}
          </div>
        )}

        {error && <div className="scanner-error">⚠️ {error}</div>}

        {image && !result && (
          <button 
            className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`} 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
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

        {result && (
          <div className="scanner-result">
            <div className="result-header">
              <h4>Diagnosis Report</h4>
              <button className="reset-btn" onClick={clear}>New Scan</button>
            </div>
            <div className="result-body">
              {result.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('Diagnosis:') ? 'diagnosis-line' : ''}>
                  {line}
                </p>
              ))}
            </div>
            <div className="result-footer">
               💡 Consult an expert before applying chemical treatments.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPestScanner;
