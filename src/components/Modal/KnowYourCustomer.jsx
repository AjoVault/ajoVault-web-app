import React, { useEffect, useState, useContext } from 'react';
import './modal.css'
import LilacButton from '../Button/LilacButton';
import forwardEmail from '../../assets/forward_to_inbox.png'
import OTPModal from './OTPModal';
import ModalDisplayContex from '../../context/modalDisplay';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';

function KnowYourCustomer() {
  
  const [dis, setDis] = useState('none');
  // const {setOtpModal} = useContext(ModalDisplayContex)

  //     useEffect(() => {
  //       setDis(displayStyle)
  //     }, [displayStyle]);

  // let modalstyle = {
  //   display: dis
  // }


  return (
    <>
    <div>
            <div id="myModal" className="modal">

            <span className="close"
            onClick={() => setDis('none')}
            >&times;</span>

            {/* Modal content */}
            <div className="modal-content modal-header" >
            <form className='' action=""
                // onSubmit={handleSubmit}
                > 
                    <div className='acct customer-div'>
                        <div className=''>
                            <h3 className='create'>Know Your Customer</h3>
                        </div>
                    </div> 
                    <p className='create-text customer-text'>All fields are required to secure your account</p>                 
                    
                    <div className='modal-body'>
                    <div>
                        <label htmlFor="name">National Identity Number</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your NIN' name='name'
                        // inputValue={name} 
                        // inputChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Bank Verification Number</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your BVN'
                         name='phone'
                         type='email'
                        // inputValue={email} 
                        //inputChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Bank</label>
                    </div>
                    <div>
                        <select className='input' name="" id="" placeholder="">
                        <option className='select' selected disabled>Select your Bank</option>
                                                        <option className='select-active' value="044">Access Bank</option>
                                                        <option value="023">  Citibank</option>
                                                        <option value="050">Ecobank</option>
                                                        <option value="214">First City Monument Bank (FCMB)</option>
                                                        <option value="070">Fidelity Bank</option>
                                                        <option value="011">First Bank</option>
                                                       
                                                        <option value="058">Guaranty Trust Bank (GTB)</option>
                                                        <option value="030">Heritage Bank</option>
                                                        <option value="301">Jaiz Bank</option>
                                                        <option value="082">Keystone Bank</option>
                                                        <option value="526">Parallex Bank</option>
                                                        <option value="101">Providus Bank</option>
                                                        <option value="221">Stanbic IBTC Bank</option>
                                                        <option value="076">Skye Bank</option>
                                                        <option value="068">Standard Chartered Bank</option>
                                                        <option value="232">Sterling Bank</option>
                                                        <option value="100">Suntrust Bank</option>
                                                        <option value="102"> Titan Trust Bank</option>
                                                        <option value="032">Union Bank</option>
                                                        <option value="033">United Bank for Africa (UBA)</option>
                                                        <option value="215">Unity Bank</option>
                                                        <option value="035">Wema Bank</option>
                                                        <option value="052">Zenith Bank</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="password">Account Number</label>
                    </div>
                    <div>
                        <Input placeholder='Enter the account number'
                         name='name' 
                         type='text'
                        //  inputValue={password}
                        //  inputChange={(e) => {setPassword(e.target.value) 
                        //     setDisplay('none')
                        // }}
                         />
                         {/* <span className='password-span' style={spanStyle}>Password must be at least 8 characters, one number and one special character</span> */}
                    </div>
                    <div>
                        <label htmlFor='promo'>Occupation</label>
                    </div>
                    <div>
                        <Input placeholder='Enter your occupation' 
                        name='promo'
                        // inputValue={promo}
                        // inputChange={(e) => setPromo(e.target.value) }
                        // required= {false}
                        />
                    </div>
                    <div className='short-btn'>
                        <div>
                            <LilacButton title='Back' color='var(--pink)' textColor='black' width='240px'/>
                        </div>
                        <div>
                            <LilacButton title='Submit' width='240px'/>
                        </div>
                    </div>
                    
                    </div>
                   
                    {/* <Modal/>    */}
                    {/* <OTPModal displayStyle={otpModal? otpModal : 'none'}/>            */}
                </form>
              
            </div>
      </div>
      </div>
    
    </>
    
  )
}

export default KnowYourCustomer