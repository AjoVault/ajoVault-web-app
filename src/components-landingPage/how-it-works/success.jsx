import React from "react";
import "./success.css";
// import Slides from "../../assets/slides";
import SuccessStory from "../Carousel/SuccessStory";

const Success = () => {
	return (

			<section className="testimonials mt-8 lg:mt-0">
				<div className="testimonials-container gap-4">
					<h1 className="testimonial-header text-[20px] ">How it Works</h1>
					<div className="secondary-container w-full lg:w-[80%] ">
						<div className="list-container w-[80%]"></div>
						<div className="list-container1">
							<ul cl>
								<li><p>Get started by signing Up or Logging in</p></li>
								<li>Choose one or more savings plans</li>
								<li>Complete KYC and sign standing order</li>
								<li>Savings payments and withdrawals are Automated</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="carousel-container">
					<h1 className="testimonial-header text-[20px]">Success Stories</h1>
					<SuccessStory />
				</div>
			</section>

	);
};

export default Success;
