import React, { useState } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  const renderIndicators = () => {
    return items.map((_, index) => (
      <div
        key={index}
        className={`carousel-indicator ${
          activeIndex === index ? "active" : ""
        }`}
        onClick={() => handleIndicatorClick(index)}
      ></div>
    ));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h1>Success Stories</h1>
      </div>
      <div className="review-card-containers">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-card ${activeIndex === index ? "active" : ""}`}
          >
            <div classNamee="img-container">
              <img
                className="card-img"
                src={item.img}
                alt={`Review by ${item.name}`}
              />
            </div>
            <p>{item.review}</p>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">{renderIndicators()}</div>
    </div>
  );
};

const items = [
  {
    name: "Tosin James",
    img: "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706346802/AjoVault%20App/pexels-christina-morillo-1181686_irzuti.jpg",
    review:
      " AjoVault has been helping me meet most of my bills obligations. I am able to pay my house rent promptly from the pooled contribution. I highly recommend it.",
  },
  {
    name: "Iren Aminu",
    img: "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706346802/AjoVault%20App/pexels-christina-morillo-1181686_irzuti.jpg",
    review:
      "Since I have been using Ajovault, I have been able to make target savings, and this has been seamless due to the automated payment and withdrawal",
  },
  {
    name: "Chika Wilson",
    img: "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706346802/AjoVault%20App/pexels-christina-morillo-1181686_irzuti.jpg",
    review:
      "AjoVault has been helping me meet most of my bills obligations. I am able to pay my house rent promptly from the pooled contribution. I highly recommend it.",
  },
];

export default Carousel;
