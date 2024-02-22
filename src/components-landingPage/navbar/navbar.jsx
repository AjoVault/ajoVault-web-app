import React from "react";
import "./navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <nav>
      <div className="nav-container">
      <div className="nav-logo-container">
        <Link to={"/"}>
          <img
            src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706269001/AjoVault%20App/logo_cn0nrq.svg"
            alt="AjoVault Logo"
          />
       </Link>
      </div>
      </div>
      <div className="navbar-link-container">
        <a href="#" className="hidden lg:flex">Contact Us</a>
        <Link to={"/Register"}>
          <button className="primary-button">Get Started</button>
        </Link>
        <div className="">
          <RxHamburgerMenu className="hamburger"/>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
