import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./testimonial.css";

const TestimonialCarousel = () => {
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
    speed: 30,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
  };

  return (
    <div className=""></div>
    // <Slider {...settings}>
    //   {testimonials.map((testimonial) => (
    //     <div key={testimonial.id} className="carousel-container">
    //       <div className=" w-4/5 mx-auto bg-[#4839A6] mt-6 rounded-lg image shadow-lg text-center ">
    //         <img
    //           src={testimonial.image}
    //           alt={testimonial.name}
    //           className="  border-2 border-[#4839A6] mx-auto mt-2 flex h-16 w-20 -translate-y-6   transform items-center justify-center rounded-full "
    //         />
    //         <div className="px-6 py-4 ">
    //           <p className="text-white text-base text-sm mb-8">
    //             {testimonial.testimonial}
    //           </p>
    //           <button><p className="text-md p-2 border  border-white inset-0 shadow-lg hover:opacity-95 border-b-1 border-l-2 text-white font-semibold mb-4">{testimonial.name}</p></button>
              
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </Slider>
  );
};

export default TestimonialCarousel;
