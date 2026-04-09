import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './WeatherWidget.css';

const MOCK_WEATHER = {
  'Nakuru': { temp: 24, condition: 'Partly Cloudy', humidity: 55, wind: 12, icon: '⛅' },
  'Uasin Gishu': { temp: 21, condition: 'Light Rain', humidity: 72, wind: 8, icon: '🌦️' },
  'Trans Nzoia': { temp: 22, condition: 'Sunny', humidity: 48, wind: 15, icon: '☀️' },
  'Kirinyaga': { temp: 26, condition: 'Clear', humidity: 50, wind: 10, icon: '🔆' },
  'Default': { temp: 23, condition: 'Mild', humidity: 60, wind: 10, icon: '🌤️' }
};

const WeatherWidget = () => {
  const { currentUser } = useAuth();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Nakuru');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch from OpenWeatherMap API here
    // using import.meta.env.VITE_WEATHER_API_KEY
    const fetchWeather = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(r => setTimeout(r, 800));
      
      const userLoc = currentUser?.location || 'Nakuru';
      setLocation(userLoc);
      setWeather(MOCK_WEATHER[userLoc] || MOCK_WEATHER['Default']);
      setLoading(false);
    };

    fetchWeather();
  }, [currentUser]);

  const getFarmingAdvice = (w) => {
    if (w.condition.includes('Rain')) return "Rain expected. Good time for top-dressing fertilizer, but avoid spraying pesticides.";
    if (w.temp > 28) return "High heat. Monitor for wilting and ensure irrigation is consistent.";
    if (w.humidity > 70) return "High humidity. Check for fungal diseases like Gray Leaf Spot.";
    if (w.wind > 20) return "High winds. Avoid spraying; risk of chemical drift is high.";
    return "Stable conditions. Ideal for general field maintenance and scouting.";
  };

  if (loading) return <div className="weather-skeleton">Loading local weather...</div>;

  return (
    <div className="weather-widget-premium">
      <div className="weather-header">
        <div className="loc-info">
          <span className="loc-label">Your Local Forecast</span>
          <h3>{location}, Kenya</h3>
        </div>
        <div className="condition-icon">{weather.icon}</div>
      </div>

      <div className="weather-metrics">
        <div className="metric">
          <span className="val">{weather.temp}°C</span>
          <span className="lbl">Temperature</span>
        </div>
        <div className="metric">
          <span className="val">{weather.humidity}%</span>
          <span className="lbl">Humidity</span>
        </div>
        <div className="metric">
          <span className="val">{weather.wind} km/h</span>
          <span className="lbl">Wind Speed</span>
        </div>
      </div>

      <div className="weather-advice">
         <span className="advice-badge">🚜 Farming Advice</span>
         <p>{getFarmingAdvice(weather)}</p>
      </div>
      
      <div className="weather-powered">
        <span>Powered by Maize Intelligence</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
