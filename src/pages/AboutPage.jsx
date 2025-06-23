import React from "react";
import "../styles/AboutPage.css";
import {
  FaShieldAlt,
  FaFolderOpen,
  FaBalanceScale,
  FaCreditCard,
  FaFileInvoice,
  FaChartLine,
  FaLightbulb,
  FaPrint,
  FaUserLock,
  FaRocket,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="about-container">
      <header className="about-hero">
        <h1>About Expencify</h1>
        <p>
          Smart, secure, and intuitive expense management — built for impact.
        </p>
      </header>

      <section className="about-section fade-in">
        <div className="about-content">
          <div className="about-text">
            <h2>Key Features</h2>
            <ul className="about-features-list">
              <li>
                <FaShieldAlt className="feature-icon" /> Secure Authentication
              </li>
              <li>
                <FaFolderOpen className="feature-icon" /> Multiple Records
                Management
              </li>
              <li>
                <FaBalanceScale className="feature-icon" /> Real-Time Balance
                Calculation
              </li>
              <li>
                <FaCreditCard className="feature-icon" /> Payment Method
                Tracking
              </li>
              <li>
                <FaFileInvoice className="feature-icon" /> Detailed Data &
                Expense Tracking
              </li>
              <li>
                <FaChartLine className="feature-icon" /> Clean and Simple UI
              </li>
              <li>
                <FaLightbulb className="feature-icon" /> Automatic Financial
                Insights
              </li>
              <li>
                <FaPrint className="feature-icon" /> Download PDF Reports
              </li>
              <li>
                <FaUserLock className="feature-icon" /> Personalized Dashboards
              </li>
              <li>
                <FaRocket className="feature-icon" /> Optimized for Speed and
                Usability
              </li>
            </ul>
          </div>
          <div className="about-image">
            <img src="/trackrecords.png" alt="Expencify Features" />
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>
          💡 Start managing your donations and expenses the smart way — only
          with Expencify.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
