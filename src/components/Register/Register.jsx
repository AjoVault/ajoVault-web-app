import React, { useContext, useEffect, useState, use } from 'react'
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
import {Outlet, Link, useNavigate} from 'react-router-dom'
// import UserContext from '../../context/userContext';
import Spinner from '../spinner/spinner';


function Register() {
    const [display, setDisplay] = useState('none');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [promo, setPromo] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [role, setRole] = useState('saver');
    const [spin, setSpin] = useState('none')

    const navigateTo = useNavigate();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*_#?&])[A-Za-z\d@$!%*_#?&]{8,}$/

    // const {setUser} = useContext(UserContext)
    

    const handleSubmit = async () => {
        // e.preventDefault();
        if(!passwordRegex.test(password)){
            console.log('incorrect')
            setDisplay('block')
            return
        }   
        
        setSpin('flex');

        try {
            const response = await fetch('https://ajovault.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(formData),
            });
            const userDetails = await response.json();

            if(response.ok){
                setSpin('none');
                if(userDetails.success === 'true'){
                    
                    console.log(userDetails);
                    // setIsSignUp(true);

                    console.log('Registration successfull')
                    setUser({email, pin:''});
                    console.log(email);
                    navigateTo('checkemail');
                }else{
                    console.log(userDetails.response);
                }
            } else{
                console.error("Registration failed")
            }
        } catch (error) {
            console.error(error)
        } 
    }

    const formData = {
        fullName:name.trim(),
        email: email,
        phone: phone,
        password: password,
        promoCode: promo,
        role: role
    }

    let spanStyle = {
        display: display,
        color: 'red',   
    }
    
    

 
  return ( 
        <>
        <div className='log-logo'>
            <img className='logo' src={Logo} alt="" />
        </div>

        <div className='login-div'>
        <div className='img-div'>
            <img className='logo' src={Logo} alt="" />
            <img className="login-img" src={loginImg} alt="" />
            <img className='login-text' src={unboardinText} alt="" />
        </div>
        <div className='form-div'>
            <div className='form-div__inner'>
                <form 
                onSubmit={(e) => e.preventDefault()}
                > 
                    <div className='acct'>
                        <h3 className='create'>Create a secure account</h3>
                        <p className='create-text' style={{marginTop: '2px'}}>Easily meet your saving goals with AjoVault</p>
                    </div>                  
                    
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your full name' name='fullname'inputValue={name} inputChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your email address'
                         name='email'
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
                         name='password' 
                         type='password'
                         inputValue={password}
                         inputChange={(e) => {setPassword(e.target.value) 
                            setDisplay('none')
                        }}
                         />
                         <span className='password-span' style={spanStyle}>Password must be at least 8 characters, one number and one special character</span>
                    </div>
                    <div>
                        <label htmlFor='promoCode'>Promo Code</label>
                    </div>
                    <div>
                        <Input placeholder='Enter promo code' 
                        name='promoCode'
                        inputValue={promo}
                        inputChange={(e) => setPromo(e.target.value) }
                        required= {false}
                        />
                    </div>
                   
                    <div className='acc-div'>
                    {/* <Link to={isSignUp ? 'checkemail' : '/register'}>  */}
                            
                            <Spinner display={spin}/>
                            <LilacButton 
                            type='button'
                            title='Create Account'
                            onClick={handleSubmit} 
                            />
                     {/* </Link> */}
                       
                        <p className='acc-text'>Already have an account? <a className='login-span'><Link to={'/login'}>Log in</Link></a> </p>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
        </>
        
    
  )
}

export default Register