import React from "react";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/firstpage.png";  
import "../css/landingpage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${landingImage})`,
      }}
    >
      <button
        className="get-started-btn"
        onClick={() => navigate("/login")}
        onMouseEnter={(e) => (e.target.innerText = "🚀 Get Started")}
        onMouseLeave={(e) => (e.target.innerText = "✨ Get Started")}
      >
        Get Started
      </button>
    </div>
  );
}
