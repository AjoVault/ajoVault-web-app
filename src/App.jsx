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
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Modal from "./components/Modal/modal.jsx";
import RegisterOutlet from './RegisterLayout.jsx'
import OTPModal from './components/Modal/OTPModal.jsx'
import EnterOTP from './components/Modal/EnterOTP.jsx'
import Password from './components/Modal/Password.jsx'
import PinModal from './components/Modal/PinModal.jsx'
import ConfirmPin from './components/Modal/ConfirmPin.jsx'
import KnowYourCustomer from "./components/Modal/KnowYourCustomer.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import PoolContribution from "./components/Modal/PoolContribution.jsx";
import PersonalSavings from "./components/Modal/PersonalSavings.jsx";
import Spinner from "./components/spinner/spinner.jsx";

function App() {
    return (
        <UserContextProvider>
            {/* <Navbar />
            <Hero />
            <ProductF />
            <Success />
            {/* <Carousel /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='register/' element={<RegisterOutlet />}>
                    <Route path='checkemail' element={<Modal />} />
                    <Route path='otp' element={<OTPModal />} />
                    <Route path='inputotp' element={<EnterOTP />} />
                    <Route path='password' element={<Password />} />
                    <Route path='pin' element={<PinModal />} />
                    <Route path='confirmpin' element={<ConfirmPin />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/knowyourcustomer' element={<KnowYourCustomer />} />
                <Route path='/pool' element={<PoolContribution/>} />
                <Route path='/personalsavings' element={<PersonalSavings/>} />
                <Route path="/spinner" element={<Spinner />} />
            </Routes>
        </UserContextProvider>
    );
}

export default App;
