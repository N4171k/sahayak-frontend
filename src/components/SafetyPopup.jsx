// src/components/SafetyPopup.jsx
import React from 'react';
import './SafetyPopup.css';

const SafetyPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3>🔰 Safety Guidelines</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <ul>
          <li>Stay calm and assess the situation</li>
          <li>Call emergency services if in immediate danger</li>
          <li>Share your location with trusted contacts</li>
          <li>Keep emergency numbers readily available</li>
          <li>Follow official safety protocols</li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyPopup;