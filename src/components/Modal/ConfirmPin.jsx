import React, { useEffect, useState, useRef, useContext } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import {Link, useNavigate} from 'react-router-dom';
import UserContext from '../../context/userContext';

function ConfirmPin({numberOfDigits=4}) {  

    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
    const [otpError, setOtpError] = useState(null);
    const otpBoxReference = useRef([]);
    const {user, setUser} = useContext(UserContext);
    const navigateTo = useNavigate();
    // const {setUser} = useContext(UserContext);
    const correctOTP = '1234'

    useEffect(() => { 
        if(otp.join("") !== "" && otp.join("") !== correctOTP){
          setOtpError("❌ Wrong OTP Please Check Again")
        }else{
          setOtpError(null)
        } 
       }, [otp]);
  

    function handleChange(value, index) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
  
      if(value && index < numberOfDigits-1){
        otpBoxReference.current[index + 1].focus()
      }
    }


    const pinData = {
      email: user.email,
      userPIN: otp.join("")
    }
    const submitPin = async () => {
      console.log(user.pin);
      console.log(user.email);
      // console.log(pinData.pin);

        if(user.pin !== pinData.userPIN){
          console.log('You have entered the wrong pin');
          return;
        } 

        try {
          const response = await fetch('https://ajovault.onrender.com/auth/createUserPIN', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                },
              body: JSON.stringify(pinData),
          });
          const userDetails = await response.json();

          if(response.ok){
              if(userDetails.success){
                  
                  console.log(userDetails);
                  console.log('Otp successfull')
                  navigateTo('/dashboard')

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

  return (
    <>
    <div>
            <div id="myModal" className="modal" >
            {/* Modal content */}
           
            <div className="modal-content otp-inbox">

              <div>
                <h4 className='modal-heading check-email'> Confirm Pin</h4>
                <p className='pin-para'>Re-enter your pin. This is to ensure that you would not forget</p>
              </div>
              <div className='otp-input'>
                    {
                        otp.map((digit, index) => (
                           <div>
                                <input key={index} value={digit} maxLength={1}
                            onChange={(e)=> handleChange(e.target.value, index)}
                            // onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
                            ref={(reference) => (otpBoxReference.current[index] = reference)}
                            className={`input otp-box`}
                            />
                           </div> 
                        ))
                    }
              </div>
              <div>
                <p className='pin-para'>By clicking complete signup, I agree to AjoVaults <span className='login-span'>Terms</span> and <span className='login-span'>Privacy policy</span> </p>
              </div>  
              <LilacButton title='Complete Sign up' onClick={submitPin}/>         
                
            </div>
      </div>
      </div>
    </> 
  )
}

export default ConfirmPin