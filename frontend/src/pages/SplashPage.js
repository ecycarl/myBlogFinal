import React, { useState } from 'react';
import '../css/SplashPage.css';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/login'); // redirect after fade-out
    }, 500);
  };

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="logo">💻</div>
      <h1>Welcome to My Blogsite Portfolio</h1>
      <p className="welcome-text">
        Explore articles, write posts, and manage your portfolio with ease!
      </p>
      <button className="action-button" onClick={handleStart}>
        Get Started
      </button>
    </div>
  );
};

export default SplashPage;