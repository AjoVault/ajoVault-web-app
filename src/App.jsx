import React from "react";
import Navbar from "./components-landingPage/navbar/navbar";
import Hero from "./components-landingPage/hero/hero";
import ProductF from "./components-landingPage/product-features/productF";


function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Hero/>
        <ProductF/>
      </div>
    </>
  );
}

export default App;
