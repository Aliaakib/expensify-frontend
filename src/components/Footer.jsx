import React from "react";
import "../styles/Footer.css";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>Expensify</h3>
          <p>Track expenses and manage data records with ease and precision.</p>
        </div>
        <div className="footer-right">
          <p>
            Developed by <strong>Bukhari Aliaakib</strong>
          </p>

          <p>
            <FaEnvelope style={{ marginRight: "8px" }} />
            <a href="mailto:aliaakibbukhari1@gmail.com">
              aliaakibbukhari1@gmail.com
            </a>
          </p>

          <p>
            <FaPhone style={{ marginRight: "8px" }} />
            <a href="tel:+916353556477">+91 63535 56477</a>
          </p>

          <div className="footer-socials">
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
          <p>
            &copy; {new Date().getFullYear()} Expensify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
