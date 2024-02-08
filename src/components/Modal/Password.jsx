import React, { useEffect, useState, useRef } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import Input from '../Input/Input';
import {Link} from 'react-router-dom'

function Password({numberOfDigits=4}) {

  return (
    <>
    <div>
            <div id="myModal" className="modal" >
            {/* Modal content */}
           
            <div className="modal-content otp-inbox password-modal">

              <div className='password'>
                <h4 className='modal-heading check-email'> You are almost done. <br />
                Enter your secure password.
                </h4>

                
                <label className='label' htmlFor='password'>Password</label>
              <Input placeholder='Enter your password'
                         name='password' 
                        //  type='password'
                        />
                    <Link to='/register/pin'>
                    <LilacButton title='Continue'/>
                  </Link>  
                   
                
              </div>
               
               
            </div>
            
      </div>
      </div>
    </> 
  )
}

export default Password