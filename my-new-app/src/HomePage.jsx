import React from "react";
import "./HomePage.css";
import backgroundImage from "./background.png"; // Import the background image

const HomePage = ({ goToForm }) => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero">
        <h1>Teknolojik Yemekler</h1>
        <p>
          KOD ACIKTIRIR <br /> PİZZA, DOYURUR
        </p>
        <button onClick={goToForm}>ACIKTIM</button>
      </div>
    </div>
  );
};

export default HomePage;
