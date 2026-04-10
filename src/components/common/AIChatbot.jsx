import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChatResponse } from '../../utils/aiService';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: "Hello! I'm your Maize Expert AI. How can I help you today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Format history for Gemini SDK (must start with a user message)
    const history = messages
      .filter((m, index) => !(index === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role,
        parts: m.parts
      }));

    const responseText = await getGeminiChatResponse(history, input);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      parts: [{ text: responseText }] 
    }]);
    setIsTyping(false);
  };

  return (
    <div className={`ai-chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      {/* Chat Bubble Launcher */}
      <button 
        className="chatbot-launcher" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <div className="launcher-icon">
          {isOpen ? '✕' : '🤖'}
        </div>
        {!isOpen && <span className="launcher-tooltip">Ask Expert!</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-info">
              <span className="bot-status-dot"></span>
              <h3>Maize Expert AI</h3>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.role}`}>
                <div className="bubble-content">
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="message-bubble model typing">
                    <div className="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask about planting, pests, market..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={!input.trim() || isTyping}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
