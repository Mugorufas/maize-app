import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getGeminiChatResponse } from '../../utils/aiService';
import { loadChats, saveChat, deleteChat as deleteChatFromDB } from '../../utils/chatHistoryService';
import { useAuth } from '../../context/AuthContext';
import './AIChatbot.css';

const DEFAULT_GREETING = "Hello! I'm your Maize Expert AI. How can I help you today?";

const makeDefaultChat = () => ({
  id: Date.now().toString(),
  title: 'New Conversation',
  messages: [{ role: 'model', parts: [{ text: DEFAULT_GREETING }] }],
  createdAt: Date.now(),
});

const AIChatbot = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chats, setChats] = useState([makeDefaultChat()]);
  const [currentChatId, setCurrentChatId] = useState(chats[0].id);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);

  // ─── Load history ─────────────────────────────────────────────────────────
  useEffect(() => {
    const initChats = async () => {
      if (currentUser) {
        // Logged in → load from Firestore
        setIsLoadingHistory(true);
        const firestoreChats = await loadChats(currentUser.uid);
        if (firestoreChats && firestoreChats.length > 0) {
          setChats(firestoreChats);
          setCurrentChatId(firestoreChats[0].id);
        } else {
          // First-time user: seed a default chat in Firestore
          const defaultChat = makeDefaultChat();
          setChats([defaultChat]);
          setCurrentChatId(defaultChat.id);
          saveChat(currentUser.uid, defaultChat);
        }
        setIsLoadingHistory(false);
      } else {
        // Guest → load from localStorage
        const saved = localStorage.getItem('maize_ai_chats');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.length > 0) {
              setChats(parsed);
              setCurrentChatId(parsed[0].id);
              return;
            }
          } catch { /* ignore */ }
        }
        const defaultChat = makeDefaultChat();
        setChats([defaultChat]);
        setCurrentChatId(defaultChat.id);
      }
    };
    initChats();
  }, [currentUser]);

  // ─── Persist to localStorage (guest only) ─────────────────────────────────
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('maize_ai_chats', JSON.stringify(chats));
    }
  }, [chats, currentUser]);

  // ─── Scroll to bottom ─────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [chats, isTyping, isOpen, currentChatId, scrollToBottom]);

  const currentChat = chats.find((c) => c.id === currentChatId) || chats[0];
  const messages = currentChat?.messages || [];

  // ─── Send message ─────────────────────────────────────────────────────────
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', parts: [{ text: input }] };
    const updatedMessages = [...messages, userMsg];

    let newTitle = currentChat.title;
    if (messages.length <= 1 && currentChat.title === 'New Conversation') {
      newTitle = input.length > 30 ? input.substring(0, 30) + '...' : input;
    }

    const updatedChat = { ...currentChat, messages: updatedMessages, title: newTitle };

    setChats((prev) =>
      prev.map((c) => (c.id === currentChatId ? updatedChat : c))
    );
    setInput('');
    setIsTyping(true);

    // Build history for Gemini (must start with user turn)
    const history = updatedMessages
      .filter((m, i) => !(i === 0 && m.role === 'model'))
      .map((m) => ({ role: m.role, parts: m.parts }));

    const responseText = await getGeminiChatResponse(history.slice(0, -1), input);

    const modelMsg = { role: 'model', parts: [{ text: responseText }] };
    const finalChat = { ...updatedChat, messages: [...updatedMessages, modelMsg] };

    setChats((prev) =>
      prev.map((c) => (c.id === currentChatId ? finalChat : c))
    );

    // Persist to Firestore if logged in
    if (currentUser) {
      saveChat(currentUser.uid, finalChat);
    }

    setIsTyping(false);
  };

  // ─── New chat ──────────────────────────────────────────────────────────────
  const startNewChat = () => {
    const newChat = makeDefaultChat();
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setShowHistory(false);
    if (currentUser) {
      saveChat(currentUser.uid, newChat);
    }
  };

  // ─── Delete chat ───────────────────────────────────────────────────────────
  const handleDeleteChat = (e, id) => {
    e.stopPropagation();

    if (currentUser) {
      deleteChatFromDB(currentUser.uid, id);
    }

    if (chats.length === 1) {
      const fresh = makeDefaultChat();
      setChats([fresh]);
      setCurrentChatId(fresh.id);
      if (currentUser) saveChat(currentUser.uid, fresh);
      return;
    }

    const remaining = chats.filter((c) => c.id !== id);
    setChats(remaining);
    if (currentChatId === id) {
      setCurrentChatId(remaining[0].id);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={`ai-chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      <button
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <div className="launcher-icon">{isOpen ? '✕' : '🤖'}</div>
        {!isOpen && <span className="launcher-tooltip">Ask Expert!</span>}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-info">
              <button
                className="history-toggle"
                onClick={() => setShowHistory(!showHistory)}
                title="Conversation History"
              >
                {showHistory ? '←' : '🕒'}
              </button>
              <div className="header-text">
                <span className="bot-status-dot"></span>
                <h3>{showHistory ? 'History' : 'Maize Expert AI'}</h3>
              </div>
            </div>
            <div className="header-actions">
              <button className="new-chat-btn" onClick={startNewChat} title="Start New Chat">+</button>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>
          </div>

          {/* Login nudge for guests */}
          {!currentUser && (
            <div className="chatbot-guest-notice">
              🔒 <a href="/login">Log in</a> to save your conversation history
            </div>
          )}

          <div className="chatbot-main-container">
            {showHistory && (
              <div className="chatbot-history-panel">
                <button className="start-new-chat-large" onClick={startNewChat}>
                  + New Chat
                </button>
                <div className="history-list">
                  {isLoadingHistory && (
                    <p className="no-history-message">Loading history...</p>
                  )}
                  {!isLoadingHistory && chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentChatId(chat.id);
                        setShowHistory(false);
                      }}
                    >
                      <span className="chat-title">{chat.title}</span>
                      <button
                        className="delete-chat-btn"
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showHistory && (
              <>
                <div className="chatbot-messages">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`message-bubble ${msg.role}`}>
                      <div className="bubble-content">{msg.parts[0].text}</div>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
