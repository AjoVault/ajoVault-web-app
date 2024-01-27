import React, { useEffect, useState, useRef } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import Input from '../Input/Input';

function Password({numberOfDigits=4}) {

  return (
    <>
    <div>
            <div id="myModal" className="modal" >
            {/* Modal content */}
           
            <div className="modal-content otp-inbox">

              <div>
                <h4 className='modal-heading check-email'> You are almost done.</h4>
                <h4 className='modal-heading check-email'> Enter your secure password.</h4>
              </div>
               <Input placeholder='Enter your password' name='password' label='Password'/>  
                        
                <LilacButton title='Continue'/>
            </div>
      </div>
      </div>
    </> 
  )
}

export default Password