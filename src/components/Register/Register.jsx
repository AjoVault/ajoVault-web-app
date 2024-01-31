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
import {Outlet, Link} from 'react-router-dom'


function Register() {
    const [display, setDisplay] = useState('none');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [promo, setPromo] = useState('');
    const [isSignUp, setSignUp] = useState(false);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*_#?&])[A-Za-z\d@$!%*_#?&]{8,}$/

    const handleSubmit = (e) => {
        // e.preventDefault();
        // console.log('hey') 
        console.log(name, email, phone, password, promo);
        if(!passwordRegex.test(password)){
            console.log('incorrect')
            setDisplay('block')
            return
        }     
        setSignUp(true)
        console.log(isSignUp)
    }

    let spanStyle = {
        display: display,
        color: 'red',   
    }
    

 
  return (    
        <div className='login-div'>
        <div className='img-div'>
            <img className='logo' src={Logo} alt="" />
            <img className="login-img" src={loginImg} alt="" />
            <img className='login-text' src={unboardinText} alt="" />
        </div>
        <div className='form-div'>
            <div className='form-div__inner'>
                <form className='' action=""
                // onSubmit={handleSubmit}
                > 
                    <div className='acct'>
                        <h3 className='create'>Create a secure account</h3>
                        <p className='create-text' style={{marginTop: '2px'}}>Easily meet your saving goals with AjoVault</p>
                    </div>                  
                    
                    <div>
                        <label htmlFor="name">Full Name</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your full name' name='name'inputValue={name} inputChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your email address'
                         name='phone'
                         type='email'
                        inputValue={email} 
                        inputChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                    <div>
                        <Input placeholder='+234'
                         name='phone'
                        inputValue={phone}
                        inputChange={(e) => setPhone(e.target.value) }
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your password'
                         name='name' 
                         type='password'
                         inputValue={password}
                         inputChange={(e) => {setPassword(e.target.value) 
                            setDisplay('none')
                        }}
                         />
                         <span className='password-span' style={spanStyle}>Password must be at least 8 characters, one number and one special character</span>
                    </div>
                    <div>
                        <label htmlFor='promo'>Promo Code</label>
                    </div>
                    <div>
                        <Input placeholder='Enter promo code' 
                        name='promo'
                        inputValue={promo}
                        inputChange={(e) => setPromo(e.target.value) }
                        required= {false}
                        />
                    </div>
                    <div className='acc-div'>
                    <Link to={isSignUp ? 'checkemail' : '/register'}> 

                            <LilacButton 
                            type='submit' 
                            title='Create Account' 
                            // onClick={() => setDisplay('block')}
                            onClick={handleSubmit}
                            />
                     </Link>
                       
                        <p className='acc-text'>Already have an account? <a className='login-span'>Log in</a> </p>
                    </div>
                    
                    {/* <Modal/>    */}
                    {/* <OTPModal displayStyle={otpModal? otpModal : 'none'}/>            */}
                </form>
            </div>
        </div>
        
    </div>
    
  )
}

export default Register