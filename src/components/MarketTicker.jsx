import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './MarketTicker.css';

const MOCK_PRICES = [
  { region: 'Nairobi', price: 'KES 3,200', trend: 'up', order: 1 },
  { region: 'Eldoret', price: 'KES 2,800', trend: 'down', order: 2 },
  { region: 'Nakuru', price: 'KES 2,950', trend: 'up', order: 3 },
  { region: 'Kisumu', price: 'KES 3,400', trend: 'up', order: 4 },
  { region: 'Mombasa', price: 'KES 3,600', trend: 'down', order: 5 },
];

export default function MarketTicker() {
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If db is not initialized, fallback to mock data
    if (!db) {
      setPrices(MOCK_PRICES);
      setIsLoading(false);
      return;
    }

    const pricesCol = collection(db, 'marketPrices');
    const unsubscribe = onSnapshot(pricesCol, async (snapshot) => {
      let pricesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Seed database if empty
      if (pricesData.length === 0) {
        try {
          for (const item of MOCK_PRICES) {
            // Use region as document ID so we don't duplicate on multiple seeds
            await setDoc(doc(db, 'marketPrices', item.region), item);
          }
          // The snapshot listener will trigger again once seeded
        } catch (error) {
          console.error("Error seeding market prices: ", error);
        }
      } else {
        // Sort by order so they appear in a consistent sequence
        pricesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setPrices(pricesData);
        setIsLoading(false);
      }
    }, (error) => {
      console.error("Error fetching market prices:", error);
      // Fallback
      setPrices(MOCK_PRICES);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayPrices = prices.length > 0 ? prices : MOCK_PRICES;

  return (
    <div className="market-ticker-wrapper">
      <div className="ticker-label">📈 Live Market (90kg Bag)</div>
      <div className="ticker-content">
        <div className="ticker-track">
          {/* Duplicate for seamless loop */}
          {[...displayPrices, ...displayPrices, ...displayPrices, ...displayPrices].map((item, idx) => (
            <div key={idx} className="ticker-item">
              <span className="ticker-region">{item.region}:</span>
              <span className="ticker-price">{item.price}</span>
              <span className={`ticker-trend ${item.trend}`}>
                {item.trend === 'up' ? '▲' : '▼'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
