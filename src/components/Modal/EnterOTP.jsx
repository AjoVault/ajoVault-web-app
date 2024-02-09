import React, { useEffect, useState, useRef, useContext } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import {Link} from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useNavigate} from 'react-router-dom'

function EnterOTP({numberOfDigits=4}) {   

    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
    const [otpError, setOtpError] = useState(null);
    const [time, setTime] = useState('5:00');
    const otpBoxReference = useRef([]);
    const navigateTo = useNavigate();

    const {user} = useContext(UserContext);

    setInterval(function () {
      var d = new Date();
      var seconds = d.getMinutes() * 60 + d.getSeconds(); //convet 00:00 to seconds for easier caculation
      var fiveMin = 60 * 5; //five minutes is 300 seconds!
      var timeleft = fiveMin - seconds % fiveMin; // let's say 01:30, then current seconds is 90, 90%300 = 90, then 300-90 = 210. That's the time left!
      var result = parseInt(timeleft / 60) + ':' + timeleft % 60; //formart seconds into 00:00 
      setTime(result);
  }, 500)

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

    const otpData = {
      email: user.email,
      otp: otp.join("")
    }
    const submitOtp = async () => {

      console.log(otpData.otp);
      console.log(otpData.email);
        try {
          const response = await fetch('https://ajovault.onrender.com/auth/verify', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                },
              body: JSON.stringify(otpData),
          });
          const userDetails = await response.json();

          if(response.ok){
              if(userDetails.success){
                  
                  console.log(userDetails);
                  console.log('Otp successfull')
                  navigateTo('/register/pin')

              }else{
                  console.log("Verification failed");
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
                <h4 className='modal-heading check-email'> Enter the OTP sent to your email address</h4>
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
                <p className='pin-para'>Didn't get a PIN? resend in {time}</p>
              </div>  
              {/* <Link to='/register/password'> */}
              <LilacButton title='Next' type='submit' onClick={submitOtp}/>
              {/* </Link>           */}
                
            </div>
      </div>
      </div>
    </> 
  )
}

export default EnterOTP