import React, { useEffect, useState } from "react";
import "../css/GameBattlePage.css";

import monster1 from "../monsters/1.png";
import monster2 from "../monsters/2.png";
import monster3 from "../monsters/3.png";
import monster4 from "../monsters/4.png";
import monster5 from "../monsters/5.png";

const GameBattlePage = () => {
  const [playerHP, setPlayerHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(100);
  const [playerAvatar, setPlayerAvatar] = useState(null);
  const [monsterAvatar, setMonsterAvatar] = useState(null);
  const [monsterName, setMonsterName] = useState("");

  const [message, setMessage] = useState(
    "A wild monster appears! Choose the correct answer to strike!"
  );

  const [gameOver, setGameOver] = useState(null);

  // 🎵 + 🎮 INIT GAME DATA
  useEffect(() => {
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => {
        console.log("Autoplay blocked");
      });
    }

    // 👤 Load player avatar
    const savedAvatar = localStorage.getItem("playerAvatar");
    if (savedAvatar) {
      setPlayerAvatar(savedAvatar);
    }

    // 👹 RANDOM MONSTER
    const monsters = [monster1, monster2, monster3, monster4, monster5];
    const monsterNames = [
      "Dark Slime",
      "Fire Goblin",
      "Shadow Beast",
      "Ice Wraith",
      "Cursed Ogre",
    ];

    const randomIndex = Math.floor(Math.random() * monsters.length);
    const randomNameIndex = Math.floor(Math.random() * monsterNames.length);

    setMonsterAvatar(monsters[randomIndex]);
    setMonsterName(monsterNames[randomNameIndex]);
  }, []);

  // ⚔️ ATTACK SYSTEM
  const handleAttack = (isCorrect) => {
    if (gameOver) return;

    if (isCorrect) {
      setMonsterHP((prev) => {
        const newHP = Math.max(prev - 20, 0);

        if (newHP === 0) {
          setGameOver("victory");
          document.getElementById("victorySound")?.play();
        }

        return newHP;
      });

      setMessage("Great! You hit the monster!");
    } else {
      setPlayerHP((prev) => {
        const newHP = Math.max(prev - 20, 0);

        if (newHP === 0) {
          setGameOver("defeat");
          document.getElementById("defeatSound")?.play();
        }

        return newHP;
      });

      setMessage("Wrong answer! The monster attacked you!");
    }
  };

  return (
    <div className="game-container">

      {/* NAV */}
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="/main">Home</a></li>
          <li><a href="/about">About Me</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/register">Register</a></li>
          <li><a className="active" href="/myGame">Game</a></li>
        </ul>
      </nav>

      <header>
        <h1>Monster Encounter</h1>
      </header>

      {/* AUDIO */}
      <audio id="bgMusic" src="/music/battleMusic.mp3" loop></audio>
      <audio id="victorySound" src="/music/victory.mp3"></audio>
      <audio id="defeatSound" src="/music/defeat.mp3"></audio>

      {/* BATTLE FIELD */}
      <div id="battlefield">

        {/* PLAYER */}
        <div className="character-box">
          <div className="stats">
            <span className="name">Hero</span>

            <div className="hp-bar-container">
              <div
                className="hp-bar-inner"
                style={{ width: `${playerHP}%` }}
              />
            </div>

            <div className="hp-text">{playerHP} / 100 HP</div>
          </div>

          <div className="sprite-wrapper">
            <img
              src={playerAvatar || "https://i.imgur.com/1X0qVxM.png"}
              alt="Player"
              className="sprite"
            />
          </div>
        </div>

        <div className="vs-badge">VS</div>

        {/* MONSTER */}
        <div className="character-box">
          <div className="stats">
            <span className="name">{monsterName}</span>

            <div className="hp-bar-container">
              <div
                className="hp-bar-inner"
                style={{ width: `${monsterHP}%` }}
              />
            </div>

            <div className="hp-text">{monsterHP} / 100 HP</div>
          </div>

          <div className="sprite-wrapper">
            <img
              src={monsterAvatar}
              alt="Monster"
              className="sprite"
            />
          </div>
        </div>
      </div>

      {/* UI */}
      <div className="ui-section">
        <div id="message-log">{message}</div>

        <div id="quiz-container">
          <h2>What is 2 + 2?</h2>

          <div className="answer-grid">
            <button onClick={() => handleAttack(false)}>3</button>
            <button onClick={() => handleAttack(true)}>4</button>
            <button onClick={() => handleAttack(false)}>5</button>
            <button onClick={() => handleAttack(false)}>6</button>
          </div>
        </div>
      </div>

      {/* VICTORY */}
      {gameOver === "victory" && (
        <div id="victory-screen">
          <div className="victory-banner">Victory!</div>
          <p style={{ color: "white", marginTop: "20px" }}>
            You defeated the monster!
          </p>

          <button className="restart-btn" onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      )}

      {/* DEFEAT */}
      {gameOver === "defeat" && (
        <div id="defeat-screen">
          <div className="defeat-banner">GAME OVER</div>

          <p style={{ color: "#ccc" }}>
            You have been defeated by the monster...
          </p>

          <button className="restart-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>

          <button
            className="restart-btn"
            style={{ background: "#555", marginTop: "10px" }}
            onClick={() => (window.location.href = "/")}
          >
            Main Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBattlePage;