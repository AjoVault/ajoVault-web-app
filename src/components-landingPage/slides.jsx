import React from "react";
import CarouselSlider from "./CarouselSlider";

const slides = [
  { image: "image1.jpg", alt: "Slide 1" },
  { image: "image2.jpg", alt: "Slide 2" },
  { image: "image3.jpg", alt: "Slide 3" },
  // Add more slides as needed
];

const App = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Carousel Slider</h1>
      <CarouselSlider slides={slides} />
    </div>
  );
};

export default App;
