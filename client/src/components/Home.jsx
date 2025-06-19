import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="overlay"></div>

      <div className="home-content">
        <h1 className="hero-title">Stay Organized, Always.</h1>
        <p className="hero-subtitle">
          Manage your tasks seamlessly with our intuitive Task Manager. Track progress,
          set deadlines, and never miss a beat.
        </p>
        <button className="hero-btn" onClick={() => navigate("/dashboard")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
