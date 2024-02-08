import React from 'react';
import "./success.css";
import Carousel from "../Carousel/Carousel";

const Success = () => {
  return (
    <div>
      <section className="testimonials">
        <div className='testimonial-header'><h1>How it Works</h1>
          <h1>Success Stories</h1>
          </div>
          <div className="testimonials-container">
          <div className="secondary-container">
          <div className="list-container"></div>
          <div className="list-container1">
            <ul>
              <li>Get started by signing Up or Logging in</li>
              <li>Choose one or more savings plans</li>
              <li>Complete KYC and sign standing order</li>
              <li>Savings payments and withdrawals are Automated</li>
            </ul>
          </div>
          </div>
            <div className='carousel-container'>
            <Carousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
