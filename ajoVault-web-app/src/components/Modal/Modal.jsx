import React, { useEffect, useState, useContext } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardEmail from '../../assets/forward_to_inbox.png'
import OTPModal from './OTPModal';
import ModalDisplayContex from '../../context/modalDisplay';

function Modal({displayStyle='none'}) {
  
  const [dis, setDis] = useState('none');
  // const {setOtpModal} = useContext(ModalDisplayContex)

      useEffect(() => {
        setDis(displayStyle)
      }, [displayStyle]);

  let modalstyle = {
    display: dis
  }

  return (
    <>
    <div>
            <div id="myModal" className="modal" style={modalstyle}>

            <span className="close"
            onClick={() => setDis('none')}
            >&times;</span>

            {/* Modal content */}
            <div className="modal-content">
              <div>
                <h4 className='modal-heading'> We need you to verify your email address ar**@gmail.com</h4>
                <p className='modal-para'>Please select how you want to be verified below</p>
              </div>
               <button 
               className='lilacBtn'
               onClick={() => {;
                setDis('none')
                // setOtpModal('block')
               }}
               type='button'
               >
                <div className='button-div'>
                  <div className='forward-email'>
                    <img className='forward-logo' src={forwardEmail} alt="" />
                  </div>
                  <div className='verify'> 
                    <h4 className='modal-heading modal-text'>Verify with email</h4>
                    <p className='modal-para'>We will send your verify code to your email</p>
                  </div>
                </div>             
               </button>
            </div>
      </div>
      </div>
    
    </>
    
  )
}

export default Modal