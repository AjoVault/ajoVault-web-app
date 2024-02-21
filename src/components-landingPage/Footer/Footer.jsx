import React, { useState } from "react";
import "./Footer.css";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRss } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Email submitted: ${email}`);
    setEmail("");
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="header-footer-links-container">
          <ul className="header-footer-links hidden lg:flex">
            <a href="">Documentation</a>
            <a href=""> Contact Us</a>
            <a href="">Getting Started</a>
            <a href=""> About Us</a>
          </ul>
        </div>
        <div className="footer-second-container">
          <div className="footer-second-content">
            <div>
              <img
                src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706960569/AjoVault%20App/Frame_1000006054_waqxlq.svg"
                alt="AjoVault"
              />
            </div>
            <div className="enter-mail">
              <p>
                Want to be the first to hear about our performance report, and
                events?
              </p>
              <div className="submission-form-container">
                <form className="subscription-form" onSubmit={handleSubmit}>
                  {/* <label htmlFor="email">Subscribe to our newsletter:</label> */}
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </form>
                <button type="submit">Hop In</button>
              </div>
            </div>
            <div className="Social-media-links hidden lg:flex">
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.YouTube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Youtube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.Instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Rss"
                >
                  <FaRss />
                </a>
              </div>
              <p>AjoVault Contact Center</p>
              <p>(+234) CALL AJOVAULT Info@ajovault.org</p>
            </div>
          </div>
        </div>
        <div className="last-footer-content">
          <div className="content">
          <div className="top-section">
            <a href="#">About Us</a>
            <a href="#">FAQs</a>
            <a href="#">Data Processisng Agreement</a>
          </div>
          <div className="bottom-section">
            <a href="#">Support</a>
            <a href="#">Terms of Use</a>
            <a href="#">Performance reports</a>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
