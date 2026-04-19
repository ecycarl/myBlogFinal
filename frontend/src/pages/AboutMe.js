// src/pages/AboutPage.js
import { Link } from 'react-router-dom';
import '../css/AboutMe.css';

import cyberLogo from '../images/cyberlogo.jpg';
import cyber1 from '../images/cyber1.jpg';
import cyber2 from '../images/cyber2.jpg';
import cyber3 from '../images/cyber3.jpg';

const AboutMe = () => {
  return (
    <div>

      {/* HEADER */}
      <header className="site-header">
        <div className="header-left">
          <img src={cyberLogo} alt="Cybersecurity Logo" className="site-logo" />
          <h1 className="logo-text">Cybersecurity Professionals</h1>
        </div>

        {/* Hamburger */}
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">☰</label>

        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/main">Home</Link></li>
            <li><Link className="active" to="/about">About Me</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/game">Game</Link></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main className="content">

        {/* Section 1 */}
        <section className="content-section-about section-highlight">
          <div className="text-image-container-about">
            <div className="text-block">
              <h2>💻 What I Love About Cybersecurity</h2>
              <p>
                Cybersecurity fascinates me because it blends technology, problem-solving, and ethical responsibility.
                Protecting systems and data from cyber threats allows me to contribute to a safer digital world.
                I enjoy thinking like hackers ethically to secure networks, software, and personal information.
              </p>
            </div>

            <div className="image-block-about">
              <img src={cyber1} alt="Cybersecurity study" />
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="content-section-about section-highlight">
          <div className="text-image-container-about reverse">

            <div className="text-block-about">
              <h2>🛡 My Journey with Cybersecurity</h2>
              <p>
                My journey began with understanding computer basics and programming fundamentals.
                As my interest in cybersecurity grew, I explored ethical hacking, online safety, and small projects
                to secure personal networks and applications.
              </p>
            </div>

            <div className="image-block-about">
              <img src={cyber2} alt="Cybersecurity student" />
            </div>

          </div>
        </section>

        {/* Timeline */}
        <section className="content-section-about">
          <div className="text-image-container-about">

            <div className="text-block">
              <h3>📅 My Cybersecurity Learning Timeline</h3>
              <ol className="timeline">
                <li>Understanding basic computer and network concepts</li>
                <li>Learning programming fundamentals (Python, HTML, CSS)</li>
                <li>Exploring web development and secure coding practices</li>
                <li>Hands-on projects: network security simulations</li>
                <li>Researching emerging cybersecurity threats</li>
              </ol>
            </div>

            <div className="image-block-about">
              <img src={cyber3} alt="Cybersecurity research" />
            </div>

          </div>
        </section>

        {/* Quote */}
        <blockquote className="highlight-quote-about">
          “Cybersecurity is much more than a matter of IT.” – Stephane Nappo
        </blockquote>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>Email: example@email.com | Contact: 000-000-0000</p>
        <p>&copy; 2026 Cybersecurity Experts</p>
      </footer>

    </div>
  );
};

export default AboutMe;