import React from 'react'
import "./navbar.css"
// import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <nav>
      <div className="nav-logo-container">
        <a href="">
    <img src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706269001/AjoVault%20App/logo_cn0nrq.svg" alt="AjoVault Logo" />
        </a>
      </div>
      <div className="navbar-link-container">
        <a href="#">Contact Us</a>
      </div>
      <button className="primary-button">Get Started</button>
    </nav>
  )
}

export default navbar


