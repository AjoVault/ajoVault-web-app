import React, { useEffect, useState } from 'react'
import './input.css';
import visibility from '../../assets/visibility.png';

function Input({placeholder="Enter your name", name="email", type ='text', inputValue, inputChange, required=true}) {
  const [place, setPlace] = useState(placeholder);
  const [inputType, setInputType] = useState(type)

  let imgStyle = {
    display: 'none'
  }

  if(type === 'password'){
    imgStyle.display = 'block'
  }

  // useEffect(() => {
  //   if(inputType === 'password'){
  //   setInputType('text')
  //   }else setInputType('password')
  //   return inputType;
  // }, [inputType]);



 
  
  return (
    <>
    <div className='input-div'>
    <img 
    className='password-img' 
    style={imgStyle} src={visibility}
     alt="" 
     onClick={() => {inputType === 'password' ? setInputType('text') : setInputType('password') }}
    />
    <input type={inputType} 
    placeholder={place}
    name={name}
    value={inputValue}
    onClick={() => setPlace('')}   
    onChange={inputChange}
    required={required}
    >   
    </input>
    </div>
    
    </>
  )
}

export default Input