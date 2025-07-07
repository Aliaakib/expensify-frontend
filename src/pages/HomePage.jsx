import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <header className="home-hero">
        <div className="home-hero-text">
          <h1>Welcome to Expensify</h1>
          <p>Your smart solution to manage records and expenses with ease.</p>
          <Link to="/register" className="home-hero-btn">
            Get Started
          </Link>
        </div>
      </header>

      <section className="home-section fade-in">
        <div className="home-content">
          <div className="home-text">
            <h2>Track Records Seamlessly</h2>
            <p>
              Expencify provides an intuitive and reliable system to
              effortlessly track, log, and maintain all your financial records
              in a central location, ensuring complete transparency and easy
              accessibility across various devices and users.
            </p>
          </div>
          <div className="home-image">
            <img src="/trackrecords.png" alt="Track Records" />
          </div>
        </div>
      </section>

      <section className="home-section fade-in">
        <div className="home-content reverse">
          <div className="home-text">
            <h2>Record Expenses Instantly</h2>
            <p>
              Easily capture and manage your expense data in real time with
              detailed inputs, instant balance updates, and clearly summarized
              reports that help you evaluate your spending efficiency and
              maintain financial clarity throughout your campaigns.
            </p>
          </div>
          <div className="home-image">
            <img src="/recordexpense.jpg" alt="Expenses" />
          </div>
        </div>
      </section>

      <section className="home-section fade-in">
        <div className="home-content">
          <div className="home-text">
            <h2>Clean UI. Simple Navigation.</h2>
            <p>
              Expencify boasts a modern and minimalist user interface built for
              speed, clarity, and usability, helping users navigate through
              financial records, switch between income and expense views, and
              retrieve information quickly and efficiently.
            </p>
          </div>
          <div className="home-image">
            <img src="/cleanui.jpg" alt="UI Layout" />
          </div>
        </div>
      </section>

      <section className="home-section fade-in">
        <div className="home-content reverse">
          <div className="home-text">
            <h2>Meet the Developer</h2>
            <p>
              I’m <strong>Bukhari Aliaakib</strong>, a tech enthusiast and
              full-stack developer with a B.Tech in Information Technology,
              passionate about building scalable, user-centric applications
              using the MERN stack.
            </p>
          </div>
          <div className="home-image">
            <img src="/myimg.PNG" alt="Developer Bukhari" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
