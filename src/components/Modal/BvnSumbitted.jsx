import React, { useEffect, useState, useRef, useContext } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardInbox from '../../assets/forward-inbox.png'
import { Link } from 'react-router-dom';
import check from '../../assets/Check.png'

const BvnSubmitted = () => {


  return (
    <>
        <div>
            <div id="myModal" className="modal " >
            

            {/* Modal content */}
           
                <div className="modal-content modal-header">

                    <div className='acct customer-div'>
                                <div className=''>
                                    <h3 className='create'>Know Your Customer</h3>
                                </div>
                    </div> 
                    <div className='modal-body' style={{textAlign: 'center'}}> 
                        <div className='check-logo'>
                        <img src={check} style={{width: '50%'}} alt="" />
                        </div>
                       
                       {/* { img&& <img src={`data:image/jpeg;base64,${capturedFace}`} alt="Captured Face" />} */}
                       <p className='pin-para'>Kyc submitted successfully for verification</p>
                    </div>

                   

                </div>
            </div>
        </div>
    </> 
  )
}

export default BvnSubmitted