import React from 'react';
import './productF.css';

const ProductF = () => {
  return (
    <div className="product-features-container">
      <div className="feature-header pb-8">
        <h1>Product Features</h1>
      </div>
      <div className="product-card-containers">
        {features.map((feature, index) => (
          <div key={index} className="product-card">
            <img src={feature.image} alt={feature.alt} />
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    title: 'Individual Savings',
    image: 'https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272263/AjoVault%20App/Savings_lp1c85.png',
    alt: 'Individual Saving',
    description: 'Automated savings plans with goal-setting option.',
  },
  {
    title: 'Pooled Contributions',
    image: 'https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272263/AjoVault%20App/Pool_av72wc.png',
    alt: 'Pooled Contributions',
    description: 'Users can create or be merged into a savings pool batch.',
  },
  {
    title: 'Community Building',
    image: 'https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272413/AjoVault%20App/Community_1_hovb8n.png',
    alt: 'Community Building',
    description: 'Shared achievement in community forums for financial tips, and success stories .',
  },
  {
    title: 'Security & Privacy',
    image: 'https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272263/AjoVault%20App/Security_ysend0.png',
    alt: 'Security & Privacy',
    description: 'Robust encryption and secure authentication for user data.',
  },
];

export default ProductF;
