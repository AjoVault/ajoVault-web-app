import React from 'react'
import "./hero.css"
import { Link } from "react-router-dom";

const hero = () => {
  return (
          <section className="hero-wrapper">
      <div className="hero-container">
        <div className="hero-right-text-content">
          <h1 className="primary-heading">
            With your <span>Saving</span>
            <br /> Power, you can <br /> build 
            <span> Wealth</span>
          </h1>
          <p className="primary-text">
            Join other wise Nigerians to revolutionize <br />their 
            personal finance, by combining <br />
            individual savings and collaborative <br /> pooled contributions.
          </p>
          <Link to={'./Register'}><button className="secondary-button">Get Started</button></Link>
        </div>
        <div className="hero-left-img-content">
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706263702/AjoVault%20App/Hero_image_mwseiu.png"
              alt="Home Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
