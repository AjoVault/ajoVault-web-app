import React, { useState } from 'react'
import loginImg from '../../assets/login-img.png'
import Logo from '../../assets/Logo.png';
import loginText from '../../assets/login-text.png'
import Input from '../Input/Input';
import LilacButton from '../Button/LilacButton';
import unboardinText from '../../assets/Unboarding-text.png'
import googleLogo from '../../assets/google.png'
import './login.css';

function Login() {
    const [state, setState] = useState('')

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
                    <h3 className='create login' >Login</h3>
                    </div>                  
                    
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your email address' name='email'/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your password' name='password' type='password'/>
                    </div>
                    
                    <div className='acc-div acc-login'>
                        <LilacButton type='button' title='Login' />
                        <div className='separator'>
                           Or                           
                        </div>
                        <div className='google-div'>
                            <img className='google-img' src={googleLogo} alt="" />
                        </div>
                        <p className='acc-text'>Don't have an account? <a className='login-span'>Register</a> </p>
                    </div>
                                      
                </form>
            </div>  
        </div>        
    </div>
  )
}

export default Login