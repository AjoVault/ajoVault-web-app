import React from "react";
import "./success.css";
// import Slides from "../../assets/slides";
import SuccessStory from "../Carousel/SuccessStory";

const Success = () => {
	return (

			<section className="testimonials mt-8 lg:mt-0">
				<div className="testimonials-container gap-4">
					<h1 className="testimonial-header text-[26px] lg:text-[44px] ">How it Works</h1>
					<div className="secondary-container w-full lg:w-[80%] ">
						<div className="list-container w-full"></div>
						<div className="list-container1 w-[80%]">
							<ul className="text-[16px]">
								<li><p className="">Get started by signing Up or Logging in</p></li>
								<li>Choose one or more savings plans</li>
								<li className="">Savings payments and withdrawals are Automated</li>
								<li className="x">Complete KYC and sign standing order</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="carousel-container">
					<h1 className="testimonial-header text-[26px] lg:text-[44px]">Success Stories</h1>
					<SuccessStory />
				</div>
			</section>

	);
};

export default Success;
