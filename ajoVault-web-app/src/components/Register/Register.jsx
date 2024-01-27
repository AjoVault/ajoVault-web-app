import React, { useContext, useEffect, useState } from 'react'
import loginImg from '../../assets/login-img.png'
import Logo from '../../assets/Logo.png';
import unboardinText from '../../assets/Unboarding-text.png'
import './register.css';
import Input from '../Input/Input';
import LilacButton from '../Button/LilacButton';
import Modal from '../Modal/modal';
import OTPModal from '../Modal/OTPModal';
import ModalContextProvider from '../../context/modalDisplayProvider';
import ModalDisplayContex from '../../context/modalDisplay';


function Register() {
    const [display, setDisplay] = useState('none');
    // const {otpModal} = useContext(ModalDisplayContex);
    useEffect(()=> {

    })

  return (
 
          
        <div className='login-div'>
        <div className='img-div'>
            <img className='logo' src={Logo} alt="" />
            <img className="login-img" src={loginImg} alt="" />
            <img className='login-text' src={unboardinText} alt="" />
        </div>
        <div className='form-div'>
            <div className='form-div__inner'>
                <form className='' action=""> 
                    <div className='acct'>
                        <h3 className='create'>Create a secure account</h3>
                        <p className='create-text' style={{marginTop: '2px'}}>Easily meet your saving goals with AjoVault</p>
                    </div>                  
                    
                    <div>
                        <label htmlFor="email">Full Name</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your full name' name='name'/>
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your email address' name='name'/>
                    </div>
                    <div>
                        <label htmlFor="email">Phone Number</label>
                    </div>
                    <div>
                        <Input placeholder='+234' name='name'/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your password' name='name' type='password'/>
                    </div>
                    <div>
                        <label htmlFor='promo'>Promo Code</label>
                    </div>
                    <div>
                        <Input placeholder='Enter promo code' name='name'/>
                    </div>
                    <div className='acc-div'>
                        <LilacButton 
                        type='button' 
                        title='Create Account' 
                        onClick={() => setDisplay('block')}
                        />
                        <p className='acc-text'>Already have an account? <a className='login-span'>Log in</a> </p>
                    </div>
                    
                    <Modal displayStyle={display}/>   
                    {/* <OTPModal displayStyle={otpModal}/>            */}
                </form>
            </div>
        </div>
        
    </div>
    
  )
}

export default Register