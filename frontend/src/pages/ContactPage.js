import React from "react";
import '../css/ContactPage.css';
const ContactPage = () => {
  return (
    <>
      <header className="site-header">


        {/* Hamburger Toggle */}
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰
        </label>

        <nav className="nav">
          <ul className="nav-links">
            <li><a href="/main">Home</a></li>
            <li><a href="/about">About Me</a></li>
            <li><a className="active" href="/contact">Contact</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/myGame">Game</a></li>
          </ul>
        </nav>
      </header>

      <main className="content">
        <section className="contact-map-section">

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Contact Me</h2>
            <form className="form-box">
              <label>
                Name
                <input type="text" placeholder="Your Name" />
              </label>

              <label>
                Email
                <input type="email" placeholder="example@email.com" />
              </label>

              <label>
                Message
                <textarea placeholder="Your message"></textarea>
              </label>

              <button type="submit">Send</button>
            </form>
          </div>

          {/* Map */}
          <div className="map-container">
            <h2>Location</h2>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBgz7L1thgkLgKdLlHRvD1hgw5hTmhJgyI&q=Don+Mariano+Marcos+Memorial+State+University+SLUC+Agoo+La+Union&zoom=18"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </section>

        <section className="content-section learning-resources">
          <h2>Learning Resources</h2>

          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>
                    Cybersecurity and Cyberwar: What Everyone Needs to Know
                  </strong>{" "}
                  by P.W. Singer & Allan Friedman
                </td>
                <td>
                  Explains the interconnected digital world and its impact on
                  cybersecurity for individuals, businesses, and governments.
                </td>
              </tr>
              <tr>
                <td><strong>Introduction to Cybersecurity</strong></td>
                <td>
                  Learn cybersecurity basics and understand modern security
                  challenges faced by organizations.
                </td>
              </tr>
              <tr>
                <td><strong>8 Key Cybersecurity Tools</strong></td>
                <td>
                  Covers tools like penetration testing, encryption, and
                  vulnerability scanning.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>External Links</h3>
          <div className="external-links">
            <a
              href="https://activelearning.ph/course/ec-council-network-defense-training-philippines/"
              target="_blank"
              rel="noreferrer"
              className="resource-link"
            >
              EC-Council Network Defense Training
            </a>

            <a
              href="https://www.udemy.com/course/cyber-security-awareness-training-course/"
              target="_blank"
              rel="noreferrer"
              className="resource-link"
            >
              Cybersecurity Awareness Training
            </a>

            <a
              href="https://www.youtube.com/watch?v=jq_LZ1RFPfU"
              target="_blank"
              rel="noreferrer"
              className="resource-link"
            >
              Cybersecurity Architecture: Five Principles
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>Email: example@email.com | Contact: 000-000-0000</p>
        <p>&copy; 2026 Cybersecurity Experts</p>
      </footer>
    </>
  );
};

export default ContactPage;