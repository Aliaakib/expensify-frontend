import React from "react";
import "../styles/ContactPage.css";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <header className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? We'd love to hear from you.</p>
      </header>

      {/* Contact Form First */}
      <section className="contact-section fade-in">
        <div className="contact-form-container">
          <h2>Contact Form</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Meet the Developer with Info Below */}
      <section className="contact-section fade-in">
        <div className="contact-meet-developer">
          <div className="contact-image">
            <img src="/myimg.PNG" alt="Bukhari Aliaakib" />
          </div>
          <div className="contact-text">
            <h2>Meet the Developer</h2>
            <p>
              I’m <strong>Bukhari Aliaakib</strong>, a passionate full-stack
              developer with a B.Tech in Information Technology. I specialize in
              the MERN stack and enjoy crafting fast, useful, and user-friendly
              web apps.
            </p>

            <div className="developer-info">
              <p>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:aliaakibbukhari1@gmail.com">
                  aliaakibbukhari1@gmail.com
                </a>
              </p>
              <p>
                <FaPhone className="contact-icon" />
                <a href="tel:+916353556477">+91 63535 56477</a>
              </p>
              <p>
                <FaGlobe className="contact-icon" />
                <a
                  href="https://bukhari-aliaakib.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bukhari-aliaakib.lovable.app
                </a>
              </p>
              <div className="contact-socials">
                <a
                  href="https://wa.me/916353556477"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://www.instagram.com/me.aliaakibbukhari?igsh=bDRubHdlaTIxMW1t&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/bukhari-aliaakib-9056581ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
