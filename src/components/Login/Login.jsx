import React, { useState } from 'react'
import loginImg from '../../assets/login-img.png'
import Logo from '../../assets/Logo.png';
import loginText from '../../assets/login-text.png'
import Input from '../Input/Input';
import LilacButton from '../Button/LilacButton';
import unboardinText from '../../assets/Unboarding-text.png'
import googleLogo from '../../assets/google.png'
import './login.css';
import Spinner from '../spinner/spinner';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spin, setSpin] = useState('none');
    const [spanData, setSpanData] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = async () => {

        setSpin('flex');

        try {
            const response = await fetch('https://ajovault.onrender.com/auth/login', {
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
                    navigateTo('/dashboard');
                }else{
                    setSpanData("Wrong email or password");
                }
            } else{
                setSpin('none');
                console.error("Registration failed")
                setSpanData("Wrong email or password")
            }
        } catch (error) {
            console.error(error)
        } 
    }

    const formData = {
        email: email,
        password: password
    }

    let spanStyle = {
        // display: display,
        color: 'red', 
        fontSize: '15px'  
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
                <form className='' action=""> 
                    <div className='acct'>
                    <h3 className='create login' >Login</h3>
                    </div>                  
                    
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <Input
                         placeholder='Enter your email address'
                         name='email'
                         inputValue={email} 
                        inputChange={(e) => setEmail(e.target.value)}
                         />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your password'
                        name='password'
                        type='password'
                        inputValue={[password]} 
                        inputChange={(e) => setPassword(e.target.value)}
                          />
                    </div>
                    <span className='password-span' style={spanStyle}>{spanData}</span>
                    
                    <div className='acc-div acc-login'>

                        <Spinner display={spin}/>
                        <LilacButton type='button' title='Login' onClick={handleSubmit}/>
                        <div className='separator'>
                           Or                           
                        </div>
                        <div className='google-div'>
                            <img className='google-img' src={googleLogo} alt="" />
                        </div>
                        <p className='acc-text'>Don't have an account? <span className='login-span'><Link to={'/register'}>Register</Link></span> </p>
                    </div>                                     
                </form>
            </div>  
        </div>        
    </div>
    </>
  )
}

export default Login