import React from "react";
import "./hero.css";
import { Link } from "react-router-dom";
import { heroImage } from "../../assets";

const hero = () => {
  return (
      <div className="hero-container">
        <div className="hero-right-content">
        <div className="hero-right-text-content">
          <div className="primary">
          <h1 className="primary-heading">
            With your <span>Saving</span> Power, You can Build
            <span> Wealth</span>
          </h1>
          </div>
          <div className="primary-container">
          <p className="primary-text">
            Join other wise Nigerians to revolutionize <br />
            their personal finance, by combining <br />
            individual savings and collaborative <br /> pooled contributions.
          </p>
          </div>
          
          <Link to={"./Register"}>
            <button className="secondary-button">Get Started</button>
          </Link>
        </div>
        </div>
        <div className="hero-left-img-content">
            <img
              src={heroImage}
              alt="Hero Image"
            />
        </div>
      </div>
  );
};

export default hero;
