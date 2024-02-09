import React from "react";
import "./success.css";
import SmilingGirl from "../../assets/smiling_girl.png";
import Carousel from "../Carousel/Carousel";

const Success = () => {
	return (
		<div>
			<section className="testimonials ">
				<div className="testimonial-header ">
					<h1>How it Works</h1>
					<h1>Success Stories</h1>
				</div>
				<div className="testimonials-container gap-4">
					<div className="secondary-container lg:w-[50%] ">
						<div className="list-container w-[80%]"></div>
						<div className="list-container1">
							<ul>
								<li>Get started by signing Up or Logging in</li>
								<li>Choose one or more savings plans</li>
								<li>Complete KYC and sign standing order</li>
								<li>Savings payments and withdrawals are Automated</li>
							</ul>
						</div>
					</div>
					{/* <div className="carousel-container"><Carousel /></div> */}
					{/* static carousel  */}
					<div className=" flex  items-center flex-col w-[40%] mt-24  rounded-md   	bg-[#5a47cf]">
						<span className="">
							<img
								className="w-36 h-36 -mt-12"
								src={SmilingGirl}
								alt=" SMILING GIRL"
							/>
						</span>
						<h2 className="px-8 text-[#fff] py-8 lg:text-[1.5rem] font-semibold">
							AjoVault has been helping me meet most of my bills obligations. I
							am able to pay my house rent promptly from the pooled
							contribution. I highly recommend it.
						</h2>
						<span className="text-white border border-white rounded-md">
							<button className=" -mb-1 -ml-1 px-8 py-2 text-white border border-white rounded-md font-bold">
								Tosin James
							</button>
						</span>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Success;
