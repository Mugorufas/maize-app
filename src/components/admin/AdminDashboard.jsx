import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, setDoc, getDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { INITIAL_GUIDES } from '../../data/guideInitialData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AdminDashboard.css';

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'clean']
  ],
};

const QUILL_FORMATS = [
  'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'
];

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('prices');
  const [prices, setPrices] = useState([]);
  const [alertConfig, setAlertConfig] = useState({ message: '', active: false, type: 'warning' });
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modFilter, setModFilter] = useState('all');

  // Content Editor State
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guideData, setGuideData] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    if (!db || !isAdmin) return;
    
    // 1. Listen for Market Prices
    const unsubPrices = onSnapshot(collection(db, 'marketPrices'), (snapshot) => {
      let data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setPrices(data);
    });

    // 2. Listen for Alert Config
    const unsubAlert = onSnapshot(doc(db, 'appConfig', 'globalAlert'), (snapshot) => {
      if (snapshot.exists()) {
        setAlertConfig(snapshot.data());
      } else {
        // Initialize if doesn't exist
        setDoc(doc(db, 'appConfig', 'globalAlert'), { message: 'Welcome to the Maize Farming Guide!', active: false, type: 'info' });
      }
    });

    // 3. Listen for Posts (Moderation)
    const unsubPosts = onSnapshot(collection(db, 'posts'), (snapshot) => {
      let data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setPosts(data);
    });

    // 4. Fetch Users (One time fetch or snapshot)
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setIsLoading(false);
    });

    return () => {
      unsubPrices();
      unsubAlert();
      unsubPosts();
      unsubUsers();
    };
  }, [isAdmin]);

  if (!isAdmin) return <Navigate to="/" />;

  const updatePrice = async (id, field, value) => {
    try {
      await updateDoc(doc(db, 'marketPrices', id), { [field]: value });
    } catch (err) { console.error(err); }
  };

  const updateAlert = async (updates) => {
    try {
      await updateDoc(doc(db, 'appConfig', 'globalAlert'), updates);
    } catch (err) { console.error(err); }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, 'posts', id));
      } catch (err) { console.error(err); }
    }
  };

  const seedGuides = async () => {
    if (!window.confirm("This will overwrite your DRAFTS with the default website text. Continue?")) return;
    setSaveStatus('Seeding...');
    try {
      const batch = writeBatch(db);
      for (const [key, data] of Object.entries(INITIAL_GUIDES)) {
        const ref = doc(db, 'guides', key);
        // We initialize with same data for draft and live
        batch.set(ref, {
          draft: data,
          live: data,
          lastUpdated: new Date().toISOString()
        });
      }
      await batch.commit();
      setSaveStatus('Success! Content seeded.');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error seeding data.');
    }
  };

  const loadGuideForEdit = async (id) => {
    setSelectedGuide(id);
    const snap = await getDoc(doc(db, 'guides', id));
    if (snap.exists()) {
      setGuideData(snap.data().draft);
    }
  };

  const saveDraft = async () => {
    setSaveStatus('Saving Draft...');
    try {
      await updateDoc(doc(db, 'guides', selectedGuide), {
        draft: guideData,
        lastUpdated: new Date().toISOString()
      });
      setSaveStatus('Draft Saved!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error saving.');
    }
  };

  const publishGuide = async () => {
    if (!window.confirm("Go Live? This will update the public guide page instantly.")) return;
    setSaveStatus('Publishing...');
    try {
      await updateDoc(doc(db, 'guides', selectedGuide), {
        live: guideData,
        lastUpdated: new Date().toISOString()
      });
      setSaveStatus('Published Live!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error publishing.');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav>
            <button className={activeTab === 'prices' ? 'active' : ''} onClick={() => setActiveTab('prices')}>📈 Market Prices</button>
            <button className={activeTab === 'alerts' ? 'active' : ''} onClick={() => setActiveTab('alerts')}>📢 Global Alerts</button>
            <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>📖 Content Editor</button>
            <button className={activeTab === 'moderation' ? 'active' : ''} onClick={() => setActiveTab('moderation')}>💬 Moderation</button>
            <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👥 Farmer Insights</button>
          </nav>
        </aside>

        <main className="admin-main">
          {activeTab === 'prices' && (
            <div className="glass-card admin-card">
              <h3>Market Prices</h3>
              <p className="admin-subtitle">Update KES per 90kg bag across regions.</p>
              <table className="admin-table">
                <thead>
                  <tr><th>Region</th><th>Price</th><th>Trend</th></tr>
                </thead>
                <tbody>
                  {prices.map(p => (
                    <tr key={p.id}>
                      <td>{p.region}</td>
                      <td><input value={p.price} onChange={e => updatePrice(p.id, 'price', e.target.value)} className="admin-input" /></td>
                      <td>
                        <select value={p.trend} onChange={e => updatePrice(p.id, 'trend', e.target.value)} className="admin-select">
                          <option value="up">▲ Up</option><option value="down">▼ Down</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="glass-card admin-card">
              <h3>Global Announcements</h3>
              <p className="admin-subtitle">Push urgent messages to all website visitors.</p>
              <div className="admin-form">
                <div className="form-group">
                  <label>Alert Message</label>
                  <ReactQuill 
                    theme="snow"
                    value={alertConfig.message} 
                    onChange={content => updateAlert({ message: content })}
                    placeholder="e.g. Warning: Heavy rains expected in Rift Valley..."
                    modules={QUILL_MODULES}
                    formats={QUILL_FORMATS}
                    className="admin-quill-editor mini"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Alert Type</label>
                    <select value={alertConfig.type} onChange={e => updateAlert({ type: e.target.value })} className="admin-select">
                      <option value="info">ℹ️ Info (Blue)</option>
                      <option value="warning">⚠️ Warning (Orange)</option>
                      <option value="incident">🚨 Emergency (Red)</option>
                    </select>
                  </div>
                  <div className="form-group toggle-group">
                    <label>Status</label>
                    <button 
                      className={`toggle-btn ${alertConfig.active ? 'active' : ''}`}
                      onClick={() => updateAlert({ active: !alertConfig.active })}
                    >
                      {alertConfig.active ? 'LIVE' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="glass-card admin-card">
              <div className="admin-card-header">
                <h3>Expert Content Editor</h3>
                {saveStatus && <span className="save-indicator">{saveStatus}</span>}
              </div>
              
              {!selectedGuide ? (
                <div className="guide-selector">
                  <p>Select a guide to edit or perform an initial content sync.</p>
                  <div className="guide-grid">
                    <button className="guide-btn" onClick={() => loadGuideForEdit('planting')}>Maize Planting</button>
                    <button className="guide-btn" onClick={() => loadGuideForEdit('care')}>Crop Care</button>
                    <button className="guide-btn" onClick={() => loadGuideForEdit('harvest')}>Harvesting</button>
                    <button className="guide-btn" onClick={() => loadGuideForEdit('pests')}>Pests & Disease</button>
                  </div>
                  <hr style={{margin: '2rem 0', opacity: 0.1}}/>
                  <div style={{textAlign: 'center'}}>
                    <button className="cp-btn secondary" onClick={seedGuides}>Reset All Guides to Default Text</button>
                  </div>
                </div>
              ) : (
                <div className="editor-container">
                  <div className="editor-header">
                    <button className="back-btn" onClick={() => setSelectedGuide(null)}>← All Guides</button>
                    {guideData && (
                      <div className="editor-actions">
                        <button className="cp-btn secondary" onClick={saveDraft}>Save Draft</button>
                        <button className="cp-btn primary" onClick={publishGuide}>Go Live</button>
                      </div>
                    )}
                  </div>

                  {!guideData ? (
                    <div className="admin-loading-mini">Fetching guide content...</div>
                  ) : (
                    <div className="editor-form">
                      <div className="form-group">
                        <label>Hero Title</label>
                        <input 
                          value={guideData.heroTitle} 
                          onChange={e => setGuideData({...guideData, heroTitle: e.target.value})}
                          className="admin-input"
                        />
                      </div>

                      <div className="editor-cards-section">
                        <h4>Navigation Cards / Steps</h4>
                        <div className="cards-edit-grid">
                          {(guideData.cards || guideData.steps || []).map((item, idx) => {
                            const isCards = !!guideData.cards;
                            return (
                              <div key={idx} className="card-edit-row">
                                <div className="card-image-edit">
                                  <img src={item.img || item.image || 'https://via.placeholder.com/150?text=No+Image'} alt="" className="admin-img-preview" />
                                  <input 
                                    type="text" 
                                    placeholder="Paste Image URL here..."
                                    className="admin-input url-input"
                                    value={item.img || item.image || ''}
                                    onChange={(e) => {
                                      const url = e.target.value;
                                      setGuideData(prev => {
                                        const key = isCards ? 'cards' : 'steps';
                                        const newList = [...prev[key]];
                                        newList[idx] = { ...newList[idx], [isCards ? 'img' : 'image']: url };
                                        return { ...prev, [key]: newList };
                                      });
                                    }}
                                  />
                                  <label className="upload-label-small">
                                    📷 Image URL
                                  </label>
                                </div>
                                <div className="card-text-edit">
                                  <label>{isCards ? 'Card Title' : 'Step Title'}</label>
                                  <input 
                                    value={item.title} 
                                    onChange={e => {
                                      setGuideData(prev => {
                                        const key = isCards ? 'cards' : 'steps';
                                        const newList = [...prev[key]];
                                        newList[idx] = { ...newList[idx], title: e.target.value };
                                        return { ...prev, [key]: newList };
                                      });
                                    }}
                                    className="admin-input"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {guideData.sections.map((section, sIdx) => (
                        <div key={section.id} className="editor-section-box">
                          <div className="section-head-edit">
                            <h4>Section: {section.title}</h4>
                            <div className="section-title-edit">
                                <label>Title</label>
                                <input 
                                  value={section.title}
                                  onChange={e => {
                                    const newSections = [...guideData.sections];
                                    newSections[sIdx].title = e.target.value;
                                    setGuideData({...guideData, sections: newSections});
                                  }}
                                  className="admin-input"
                                />
                            </div>
                          </div>
                          <div className="form-group quill-editor-group">
                            <label>Full Explanation Paragraph / Expert Tip (Rich Text)</label>
                            <ReactQuill 
                              theme="snow"
                              value={section.explanation || section.expertTip || ''}
                              modules={QUILL_MODULES}
                              formats={QUILL_FORMATS}
                              onChange={(content) => {
                                const newSections = [...guideData.sections];
                                if (newSections[sIdx].explanation !== undefined) {
                                  newSections[sIdx].explanation = content;
                                } else {
                                  newSections[sIdx].expertTip = content;
                                }
                                setGuideData({...guideData, sections: newSections});
                              }}
                              className="admin-quill-editor"
                            />
                          </div>
                          <div className="qa-editor-grid">
                            {section.items.map((item, iIdx) => (
                              <div key={iIdx} className="qa-edit-box">
                                <label>{item.label}</label>
                                <ReactQuill 
                                  theme="snow"
                                  value={item.text}
                                  onChange={(content) => {
                                    const newSections = [...guideData.sections];
                                    newSections[sIdx].items[iIdx].text = content;
                                    setGuideData({...guideData, sections: newSections});
                                  }}
                                  modules={{
                                    toolbar: [
                                      ['bold', 'italic', 'underline'],
                                      [{ 'list': 'bullet' }],
                                      ['clean']
                                    ]
                                  }}
                                  className="admin-quill-editor micro"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'moderation' && (
            <div className="glass-card admin-card">
              <div className="admin-card-header">
                <h3>Community Moderation</h3>
                <div className="admin-filters">
                  <button className={modFilter === 'all' ? 'active' : ''} onClick={() => setModFilter('all')}>All Posts</button>
                  <button className={modFilter === 'unanswered' ? 'active' : ''} onClick={() => setModFilter('unanswered')}>❓ Needs Help</button>
                </div>
              </div>
              <p className="admin-subtitle">Delete spam or off-topic posts.</p>
              <div className="moderation-list">
                {posts
                  .filter(p => modFilter === 'all' || (p.replies && p.replies.length === 0))
                  .map(post => (
                    <div key={post.id} className="mod-item">
                      <div className="mod-info">
                        <strong>{post.title}</strong>
                        <span>by {post.author} • {post.replies?.length || 0} replies</span>
                      </div>
                      <button className="del-btn" onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                  ))}
                {posts.length === 0 && <p>No posts found.</p>}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass-card admin-card">
              <h3>Farmer Insights</h3>
              <div className="admin-stats-grid">
                <div className="stat-box">
                  <span className="stat-label">Total Farmers</span>
                  <span className="stat-value">{users.length}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Top Counties</span>
                  <div className="stat-list">
                    {Object.entries(
                      users.reduce((acc, u) => {
                        const loc = u.location || 'Unknown';
                        acc[loc] = (acc[loc] || 0) + 1;
                        return acc;
                      }, {})
                    )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([loc, count]) => (
                      <div key={loc} className="stat-list-item">
                        <span>{loc}</span>
                        <strong>{count}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="admin-subtitle" style={{marginTop: '2rem'}}>Full list of registered users.</p>
              <table className="admin-table">
                <thead>
                  <tr><th>Username</th><th>Location</th><th>Contact</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.username}</strong></td>
                      <td>{u.location}</td>
                      <td>{u.email} <br/><small>{u.phone}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
