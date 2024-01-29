import React, { useEffect, useState } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import { Link } from 'react-router-dom';

function OTPModal() {

  return (
    <>
    <div>
            <div id="myModal" className="modal" >
            

            {/* Modal content */}
           
            <div className="modal-content otp-inbox">
              <div className='forward-email input-logo'>
                <img className='forward-logo' src={forwardInbox} alt="" />
              </div>
  
                <div>
                  <h4 className='modal-heading check-email'> Check your email for an OTP</h4>
                </div >

                <Link to='/inputotp'>
              <LilacButton
              type='text'
              title='Next'
              />
            </Link>
            </div>
      </div>
      </div>
    </> 
  )
}

export default OTPModal