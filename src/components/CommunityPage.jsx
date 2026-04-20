import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, doc, arrayUnion, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import './CommunityPage.css';

const MOCK_POSTS = [
  {
    author: 'Samuel K. (Eldoret)',
    time: '2 hours ago',
    title: 'Yellow striping on young leaves?',
    content: 'My maize is about 4 weeks old and I am noticing clear yellow stripes between the veins on the upper leaves. Is this a disease or a nutrient problem?',
    upvotes: 12,
    replies: [
      {
        id: 101,
        author: 'Expert_Rufas',
        time: '1 hour ago',
        content: 'Hi Samuel. This is a classic sign of Zinc deficiency, very common in soils around Eldoret. I highly recommend applying a Zinc Sulfate foliar spray as soon as possible.',
        isExpert: true
      },
      {
        id: 102,
        author: 'Jane M.',
        time: '45 mins ago',
        content: 'Thanks for the tip! I had the same issue last season and the foliar spray worked wonders within days.',
        isExpert: false
      }
    ],
    timestamp: new Date().getTime()
  },
  {
    author: 'Daniel W. (Machakos)',
    time: '5 hours ago',
    title: 'Fall Armyworm trap effectiveness',
    content: 'Has anyone tried using the pheromone traps for Fall Armyworm before planting? Do they actually help reduce the population before the crop emerges?',
    upvotes: 8,
    replies: [
      {
        id: 201,
        author: 'Expert_Rufas',
        time: '3 hours ago',
        content: 'Yes! Pheromone traps are excellent for early warning. Place them 2-3 weeks before planting. Once you catch 3-4 moths per night, you know the pressure is high and you should prepare your protective sprays.',
        isExpert: true
      }
    ],
    timestamp: new Date().getTime() - 10000
  },
  {
    author: 'Wanjiku99',
    time: '1 day ago',
    title: 'What spacing for DK8031?',
    content: 'I switched to DK8031 hybrid this year. Should I stick to the standard 75cm by 30cm spacing, or can I plant them closer together?',
    upvotes: 5,
    replies: [],
    timestamp: new Date().getTime() - 20000
  }
];

export default function CommunityPage() {
  const { currentUser, userData, isAdmin } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Track which post has an active reply box open
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // If Firebase isn't hooked up yet, stop here so we don't crash.
    if (!db) {
      setIsLoading(false);
      return;
    }

    const postsCol = collection(db, 'posts');
    const unsubscribe = onSnapshot(postsCol, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by timestamp if available
      postsData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setPosts(postsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !db) return;

    try {
      await addDoc(collection(db, 'posts'), {
        author: userData?.username || 'Anonymous Farmer',
        isExpert: isAdmin || userData?.role === 'expert',
        time: 'Just now',
        content: newContent,
        title: newTitle,
        upvotes: 0,
        replies: [],
        timestamp: serverTimestamp()
      });
      setNewTitle('');
      setNewContent('');
    } catch (err) {
      console.error("Failed to post: ", err);
    }
  };

  const handleReplySubmit = async (postId) => {
    if (!replyText.trim() || !db) return;

    try {
      const postRef = doc(db, 'posts', postId);
      const newReply = {
        id: Date.now(),
        author: userData?.username || 'Anonymous Farmer',
        time: 'Just now',
        content: replyText,
        isExpert: isAdmin || userData?.role === 'expert'
      };
      
      await updateDoc(postRef, {
        replies: arrayUnion(newReply)
      });
      
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      console.error("Failed to reply: ", err);
    }
  };

  const handleUpvote = async (postId, currentUpvotes) => {
    if (!db) return;
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        upvotes: currentUpvotes + 1
      });
    } catch (err) {
       console.error("Failed to upvote: ", err);
    }
  };

  const seedDatabase = async () => {
    if (!db) return;
    try {
      setIsLoading(true);
      const postsCol = collection(db, 'posts');
      for (const p of MOCK_POSTS) {
        await addDoc(postsCol, p);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error seeding DB:", error);
      setIsLoading(false);
    }
  };

  if (!db) {
    return (
      <div className="community-container">
        <div className="glass-card new-post-card" style={{ textAlign: 'center', borderColor: '#f44336' }}>
          <h2 style={{ color: '#f44336', marginBottom: '1rem' }}>Database Not Connected</h2>
          <p>You have approved using Firebase, but your API keys are missing!</p>
          <br/>
          <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <strong>Action Required:</strong>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
              <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{color: 'var(--primary-color)'}}>firebase.google.com</a> and create a free project.</li>
              <li>Click the Web icon (<code>&lt;/&gt;</code>) to register an app and get your <code>firebaseConfig</code> object.</li>
              <li>Open your project and find the file named <code>.env</code> in the root directory.</li>
              <li>Replace <code>YOUR_API_KEY_HERE</code> and the other placeholders with your exact Firebase API keys.</li>
              <li>If you are running the app locally right now, you must restart your terminal server (Ctrl+C, then <code>npm run dev</code>).</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="community-container" data-readable="true">
      <div className="community-header">
        <h1>Community Q&A Board</h1>
        <p>Ask questions, share your farming experiences, and get advice from experts and fellow farmers.</p>
      </div>

      <div className="community-main">
        {/* New Post Form */}
        {currentUser ? (
          <div className="glass-card new-post-card">
            <h3>Ask a Question</h3>
            <form onSubmit={handlePostSubmit}>
              <input 
                type="text" 
                placeholder="Question Title (e.g., Yellow leaves on seedlings?)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="cp-input"
              />
              <textarea 
                placeholder="Describe your issue or question in detail..."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                className="cp-textarea"
                rows="3"
              />
              <button type="submit" className="cp-btn primary">Post Question</button>
            </form>
          </div>
        ) : (
          <div className="glass-card new-post-card" style={{textAlign: 'center', padding: '3rem'}}>
             <h3>Join the Discussion</h3>
             <p style={{color: 'var(--text-light)', marginBottom: '1.5rem'}}>Please log in or create an account to ask questions and reply to other farmers.</p>
             <NavLink to="/login" className="cp-btn primary" style={{textDecoration:'none', display:'inline-block'}}>Log In to Post</NavLink>
          </div>
        )}

        {/* Loading State or Seed Option */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>No Posts Yet!</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>The database connection was successful, but there are no posts in the "posts" collection.</p>
            <button className="cp-btn primary" onClick={seedDatabase}>Auto-Upload the 3 Mock Questions</button>
          </div>
        ) : (
          <div className="posts-feed">
            {posts.map(post => (
              <div key={post.id} className="glass-card post-card">
                <div className="post-top">
                  <div className="post-meta">
                    <span className="post-author">
                      {post.author} {post.isExpert && <span className="expert-badge mini">🛡️ Expert</span>}
                    </span>
                    <span className="post-time">• {post.time}</span>
                  </div>
                </div>
                
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.content}</p>
                
                <div className="post-actions">
                  <button className="cp-action-btn" onClick={() => handleUpvote(post.id, post.upvotes)}>
                    👍 {post.upvotes || 0} Upvotes
                  </button>
                  <button 
                    className="cp-action-btn" 
                    onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                  >
                    💬 {post.replies ? post.replies.length : 0} Replies
                  </button>
                </div>

                {/* Replies Section */}
                {post.replies && post.replies.length > 0 && (
                  <div className="replies-container">
                    {post.replies.map(reply => (
                      <div key={reply.id} className={`reply-card ${reply.isExpert ? 'expert-reply' : ''}`}>
                        <div className="reply-meta">
                          <span className="reply-author">
                            {reply.author} {reply.isExpert && <span className="expert-badge">✔️ Expert</span>}
                          </span>
                          <span className="reply-time">{reply.time}</span>
                        </div>
                        <p className="reply-body">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Box */}
                {replyingTo === post.id && (
                  <div className="reply-input-box">
                    {currentUser ? (
                      <>
                        <textarea 
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          className="cp-textarea small"
                          rows="2"
                        />
                        <div className="reply-input-actions">
                          <button className="cp-btn secondary" onClick={() => setReplyingTo(null)}>Cancel</button>
                          <button className="cp-btn primary" onClick={() => handleReplySubmit(post.id)}>Submit Reply</button>
                        </div>
                      </>
                    ) : (
                      <p style={{padding:'1rem', textAlign:'center', background: 'rgba(0,0,0,0.05)', borderRadius: '8px'}}>
                        You must be <NavLink to="/login" style={{color:'var(--primary-color)', fontWeight: 'bold'}}>logged in</NavLink> to reply.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
