import React from 'react';
import './HomeScreen.css';

const HomeScreen = () => {
  return (
    <div className="home-container">
      <p className="home-description">
        Please log in or register to access your results.
      </p>
      <div className="home-buttons">
        <a href="/login" className="home-button">Login</a>
        <a href="/register" className="home-button">Register</a>
      </div>
    </div>
  );
};

export default HomeScreen;
