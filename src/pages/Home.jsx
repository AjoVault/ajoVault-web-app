import Navbar from "../components-landingPage/navbar/navbar";
// import Nav from "../components-landingPage/navbar/nav"
import ProductF from "../components-landingPage/product-features/productF";
import Hero from "../components-landingPage/hero/hero";
import Success from "../components-landingPage/how-it-works/success";
import Footer from "../components-landingPage/Footer/Footer";

const Home = () => {
  return (
    <section className="">
      <Navbar />
      <Hero />
      <ProductF />
      <Success />
      <Footer /> 
    </section>
  );
};

export default Home;
