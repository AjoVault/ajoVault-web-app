import React from "react";
import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import AOS from "aos";
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
import KnowYourCustomer from "./components/Modal/KnowYourCustomer.jsx";
import PoolContribution from "./components/Modal/PoolContribution.jsx";
import PersonalSavings from "./components/Modal/PersonalSavings.jsx";
import Spinner from "./components/spinner/spinner.jsx";
// import Nav from "./components-landingPage/navbar/nav.jsx";
// import Logo from "./components-landingPage/navbar/logo.jsx"
import Card from "./components-landingPage/Carousel/Card.jsx";
import Testimonial from "./components-landingPage/Carousel/testimonial.jsx";
import {TransactionPage} from "./pages/TransactionPage/TransactionPage.jsx";
import {UserContextProvider} from "./context/UserContextProvider.jsx";
import CaptureImage from "./components/Modal/CaptureImage.jsx";

import BvnSubmitted from "./components/Modal/BvnSumbitted.jsx";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/register/*" element={<Register />}></Route>
				<Route path="/register/*" element={<RegisterOutlet />}>
					<Route path="checkemail" element={<Modal />} />
					<Route path="otp" element={<OTPModal />} />
					<Route path="inputotp" element={<EnterOTP />} />
					<Route path="password" element={<Password />} />
					<Route path="pin" element={<PinModal />} />
					<Route path="confirmpin" element={<ConfirmPin />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/knowyourcustomer" element={<KnowYourCustomer />} />
				<Route path="/pool" element={<PoolContribution />} />
				<Route path="/personalsavings" element={<PersonalSavings />} />
				<Route path="/captureimage" element={<CaptureImage />} />
				<Route path="/kycsubmitted" element={<BvnSubmitted />} />
				<Route path="/spinner" element={<Spinner />} />
				<Route path="/card" element={<Card />} />
				{/* <Route path="/nav" element={<Nav />} />
      <Route path="/logo" element={<Logo />} /> */}
				<Route path="/testimonial" element={<Testimonial />} />
			</Routes>
		</UserContextProvider>
	);
}
// function App() {
// 	useEffect(() => {
// 		AOS.init({
// 			duration: 800,
// 			easing: "ease-out-sine",
// 		});
// 	}, []);
// }

export default App;
