import React, { useEffect, useState } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardEmail from '../../assets/forward_to_inbox.png'

function OTPModal({displayStyle='none'}) {
  
//   const [dis, setDis] = useState(style);

    //   useEffect(() => {
    //     setDis(style)
    //   }, [style]);

  let OTPModalstyle = {
    display: displayStyle
  }
  return (
    <>
    <div>
            <div id="myModal" className="modal" style={OTPModalstyle}>

            {/* Modal content */}
            <div className="modal-content">
              <div>
                <h4 className='modal-heading'> Check your email for an OTP</h4>
               
              </div>
                
              
               <LilacButton title='Next'/>
            </div>
      </div>
      </div>
    </> 
  )
}

export default OTPModal