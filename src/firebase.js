import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

let app = null;
let db = null;
let auth = null;
let storage = null;

// Only initialize if the user has actually provided real API keys
if (apiKey && apiKey !== "YOUR_API_KEY_HERE") {
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { db, auth, storage };
