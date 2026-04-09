import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return; // Firebase not initialized
    }

    let unsubscribeFromUser = null;

    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      // If we were listening to a previous user, stop
      if (unsubscribeFromUser) unsubscribeFromUser();

      if (user && db) {
        // Real-time listener for user profile data (farmData, roles, etc)
        unsubscribeFromUser = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          } else {
            setUserData(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user data:", error);
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeFromAuth();
      if (unsubscribeFromUser) unsubscribeFromUser();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    isAdmin: userData?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
