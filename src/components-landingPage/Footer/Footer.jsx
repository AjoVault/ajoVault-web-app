import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the submitted email, like sending it to a server or storing it in state
    console.log(`Email submitted: ${email}`);
    // You might want to clear the email input after submission
    setEmail("");
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="header-footer-links-container">
          <ul className="header-footer-links">
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
                <button type="submit">Hop In</button>
              </form>
            </div>
            <div className="Social-media-links">
                <p>AjoVault Contact Center</p>
            </div>
          </div>
        </div>
        <p>&copy; 2023 Your Company</p>
        {/* Add more footer content as needed */}
      </div>
    </footer>
  );
};

export default Footer;
