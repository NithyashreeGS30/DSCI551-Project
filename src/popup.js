// Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-popup" onClick={onClose}>×</span>
        <h2>Thank you for shopping with us!</h2>
        <p>Your order has been successfully placed.</p>
      </div>
    </div>
  );
};

export default Popup;
