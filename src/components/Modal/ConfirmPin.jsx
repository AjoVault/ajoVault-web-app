import React, { useEffect, useState, useRef } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import {Link} from 'react-router-dom';

function ConfirmPin({numberOfDigits=4}) {

    

    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
    const [otpError, setOtpError] = useState(null);
    const otpBoxReference = useRef([]);

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

  return (
    <>
    <div>
            <div id="myModal" className="modal" >
            {/* Modal content */}
           
            <div className="modal-content otp-inbox">

              <div>
                <h4 className='modal-heading check-email'> Confirm Pin</h4>
                <p>Re-enter your pin. This is to ensure that you would not forget</p>
              </div>
              <div className='otp-input'>
                    {
                        otp.map((digit, index) => (
                           <div>
                                <input key={index} value={digit} maxLength={1}
                            onChange={(e)=> handleChange(e.target.value, index)}
                            onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
                            ref={(reference) => (otpBoxReference.current[index] = reference)}
                            className={`otp-box`}
                            />
                           </div> 
                        ))
                    }
              </div>
              <div>
                <p className='pin-para'>By clicking complete signup, I agree to AjoVaults <span className='login-span'>Terms</span> and <span className='login-span'>Privacy policy</span> </p>
              </div>  
              <Link to='/login'>
              <LilacButton title='Complete Sign up'/>
              </Link>          
                
            </div>
      </div>
      </div>
    </> 
  )
}

export default ConfirmPin