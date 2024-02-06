import React from "react";
import "./hero.css";

const hero = () => {
	return (
		<section className="hero-wrapper ">
			<div className="hero-container">
				<div className="hero-right-text-content ">
					<h1
						data-aos="fade-up"
						data-aos-duration="600"
						data-aos-delay="200"
						className="primary-heading"
					>
						With your <span>Saving</span>
						<br /> Power, you can <br /> build
						<span> Wealth</span>
					</h1>
					<p
						data-aos="fade-right"
						data-aos-duration="600"
						data-aos-delay="200"
						className="primary-text"
					>
						Join other wise Nigerians to revolutionize <br />
						their personal finance, by combining <br />
						individual savings and collaborative <br /> pooled contributions.
					</p>
					<button className="secondary-button">Get Started</button>
				</div>
				<div className="hero-left-img-content">
					<div
						data-aos="fade-right"
						data-aos-duration="600"
						data-aos-delay="200"
						className="image-container"
					>
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
