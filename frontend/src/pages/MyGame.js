import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyGame.css";

import monster1 from "../monsters/1.png";
import monster2 from "../monsters/2.png";
import monster3 from "../monsters/3.png";
import monster4 from "../monsters/4.png";
import monster5 from "../monsters/5.png";

const GameStartPage = () => {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // 🎵 Music
  useEffect(() => {
    const bgMusic = document.getElementById("bgMusic");
    if (!bgMusic) return;

    bgMusic.volume = 0.2;

    const playAudio = () => {
      bgMusic.play().catch(() => {});
    };

    playAudio();

    ["click", "keydown", "touchstart", "mousedown"].forEach((event) =>
      window.addEventListener(event, playAudio)
    );

    return () => {
      ["click", "keydown", "touchstart", "mousedown"].forEach((event) =>
        window.removeEventListener(event, playAudio)
      );
    };
  }, []);

  // 🚀 Start Game
  const handleStartGame = () => {
    if (!playerName || !selectedAvatar) {
      alert("Please enter your name and select an avatar!");
      return;
    }

    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerAvatar", selectedAvatar);

    navigate("/game"); // ✅ GO TO BATTLE PAGE
  };

  const avatars = [monster1, monster2, monster3, monster4, monster5];

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <h1 className="logo-text">Welcome to RPG Game</h1>
        </div>

        <nav className="nav">
          <ul className="nav-links">
            <li><a href="/main">Home</a></li>
            <li><a href="/about">About Me</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/register">Register</a></li>
            <li><a className="active" href="/myGame">Game</a></li>
          </ul>
        </nav>
      </header>

      <main className="game-container">
        <h1>Enter Your Name & Choose Your Avatar</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="name-input"
        />

        <div className="avatars">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </div>

        <button onClick={handleStartGame} className="start-btn">
          Start Game
        </button>

        <audio id="bgMusic" src="/music/backMusic.mp3" loop></audio>
      </main>
    </>
  );
};

export default GameStartPage;