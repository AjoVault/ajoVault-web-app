import React from 'react'
import "./productF.css"

const productF = () => {
  return (
   <section className="product-features-contianer">
    <div className="feature-header">
      <h1>Product Features</h1>
    </div>
    <div className="product-card-containers">
      <div className="product-card">
        <img src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272263/AjoVault%20App/Savings_lp1c85.png" alt="Individual Saving" />
        <h2>
          Individual Savings
        </h2>
        <p>Automated savings palns with goal setting option.</p>
      </div>

      <div className="product-card">
        <img src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272263/AjoVault%20App/Pool_av72wc.png" alt="Pooled Contributions" />
        <h2>
         Pooled Contributions
        </h2>
        <p>Users can create or be merged to a savings pool batch.</p>
      </div>

      <div className="product-card">
        <img src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272413/AjoVault%20App/Community_1_hovb8n.png" alt="Community Building" />
        <h2>
          Community Building
        </h2>
        <p>Shared achievement in community forums for financial tips, and success stories .</p>
      </div>

      <div className="product-card">
        <img src="https://res.cloudinary.com/dws3lnn4d/image/upload/v1706272263/AjoVault%20App/Security_ysend0.png" alt="Security & Privacy" />
        <h2>
          Security & Privacy
        </h2>
        <p>Robust encryption and secure authentication for user data.</p>
      </div>
    </div>
   </section>
  )
}

export default productF