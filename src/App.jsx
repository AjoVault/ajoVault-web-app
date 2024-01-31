import React from "react";
import Navbar from "./components-landingPage/navbar/navbar";
import Hero from "./components-landingPage/hero/hero";
import ProductF from "./components-landingPage/product-features/productF";
import Success from "./components-landingPage/how-it-works/success";
import Carousel from "./components-landingPage/Carousel/Carousel";


function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Hero/>
        <ProductF/>
        <Success/>
        <Carousel/>
      </div>
    </>
  );
}

// const data =[

// ]
export default App;
