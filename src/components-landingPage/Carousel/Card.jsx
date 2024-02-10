import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const testimonials = [
        {
          id: 1,
          name: "Tosin James",
          image:
            "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706346802/AjoVault%20App/pexels-christina-morillo-1181686_irzuti.jpg",
          testimonial:
            " AjoVault has been helping me meet most of my bills obligations. I am able to pay my house rent promptly from the pooled contribution. I highly recommend it.",
        },
        {
          id: 2,
          name: "Iren Aminu",
          image:
            "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706346802/AjoVault%20App/pexels-christina-morillo-1181686_irzuti.jpg",
          testimonial:
            "Since I have been using Ajovault, I have been able to make target savings, and this has been seamless due to the automated payment and withdrawal",
        },
        {
          id: 3,
          name: "Chika Wilson",
          image:
            "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706346802/AjoVault%20App/pexels-christina-morillo-1181686_irzuti.jpg",
          testimonial:
            "AjoVault has been helping me meet most of my bills obligations. I am able to pay my house rent promptly from the pooled contribution. I highly recommend it.",
        },
      ];

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
      };

    return(
        <div>
        <div className=" flex  m-7  ">
            <div className="">
            <div className="text-[#5A47CF] font-semibold text-3xl m-5   ">How it Works</div>
            
             <div className="p-6 h-80 w-3/5 lg:bg-white shadow-lg rounded-2xl pt-7 border-[#5E0035]  border-solid b border-t-8 border-l-8 md: shadow-none border-none w-max-full ">
                <ul className="list-disc text-[#5A47CF] ml-3 pt-3 ">
                    <li className="text-sm p-3 "><p className="text-black">Get started by signing Up or Logging In</p></li>
                    <li className=" text-sm p-3"> <p className="text-black">Choose one or more savings plans</p></li>
                    <li className=" text-sm p-3"><p className="text-black">Complete KYC and sign standing order</p></li>
                    <li className=" text-sm p-3"><p className="text-black">Savings payment and withdrawal are automated</p></li>
                </ul>
             </div>
            </div>
           
            <div className=" ">
            <div className="text-[#5A47CF] font-semibold text-3xl  ">Success Stories</div>
            <Slider {...settings}>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="px-8 py-4 relative ">
          <div className="w-2/5 mx-auto bg-[#4839A6] mt-6 rounded-lg image shadow-lg text-center ">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="  border-2 border-[#4839A6] mx-auto mt-2 flex h-16 w-20 -translate-y-6   transform items-center justify-center rounded-full "
            />
            <div className="px-6 py-4 ">
              <p className="text-white text-base text-sm mb-8">
                {testimonial.testimonial}
              </p>
              <button><p className="text-md p-2 border  border-white inset-0 shadow-lg hover:opacity-95 border-b-1 border-l-2 text-white font-semibold mb-4">{testimonial.name}</p></button>
              
            </div>
          </div>
        </div>
      ))}
    </Slider>
            </div>
        </div>
    

        </div>
    )
    
    };
    export default Carousel;