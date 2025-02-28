import React, { useState } from 'react';
import SafetyPopup from './SafetyPopup';
import './Home.css';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  };

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Sahayak</h1>
        <p>Your virtual assistant for safety and emergency services</p>
        <a href="/chat"><button className="chat-button">Start Chat</button></a>
      </section>

      <div className="features">
        <div className="feature-card">
          <h2>Safety Guidelines</h2>
          <button onClick={() => setShowPopup(true)}>Show Guidelines</button>
          {showPopup && <SafetyPopup onClose={() => setShowPopup(false)} />}
        </div>

        <div className="feature-card">
          <h2>Emergency Contacts</h2>
          <button onClick={() => window.open('tel:+911234567890')}>Call Emergency</button>
        </div>

        <div className="feature-card">
          <h2>Location Services</h2>
          <button onClick={getLocation}>Get Location</button>
          {location && (
            <p className="location-info">
              Latitude: {location.lat}, Longitude: {location.lng}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;