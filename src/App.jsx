import React, {useEffect} from "react";
import Navbar from "./components-landingPage/navbar/navbar";
import Hero from "./components-landingPage/hero/hero";
import ProductF from "./components-landingPage/product-features/productF";
import Success from "./components-landingPage/how-it-works/success";
import Carousel from "./components-landingPage/Carousel/Carousel";
import AOS from "aos";

import {Route, Routes} from "react-router-dom";
import Footer from "./components-landingPage/Footer/Footer.jsx";
// import Carousel from "./components-landingPage/Carousel/Carousel";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Modal from "./components/Modal/modal.jsx";
import RegisterOutlet from "./RegisterLayout.jsx";
import OTPModal from "./components/Modal/OTPModal.jsx";
import EnterOTP from "./components/Modal/EnterOTP.jsx";
import Password from "./components/Modal/Password.jsx";
import PinModal from "./components/Modal/PinModal.jsx";
import ConfirmPin from "./components/Modal/ConfirmPin.jsx";
import {TransactionPage} from "./pages/TransactionPage/TransactionPage.jsx";

function App() {
	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: "ease-out-sine",
		});
	}, []);
	return (
		<div>
			{/* <Navbar />
			<Hero />
			<ProductF />
			<Success />
			<Footer /> */}
			{/* <Carousel /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/register/" element={<RegisterOutlet />}>
					<Route path="checkemail" element={<Modal />} />
					<Route path="otp" element={<OTPModal />} />
					<Route path="inputotp" element={<EnterOTP />} />
					<Route path="password" element={<Password />} />
					<Route path="pin" element={<PinModal />} />
					<Route path="confirmpin" element={<ConfirmPin />} />
				</Route>

				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
