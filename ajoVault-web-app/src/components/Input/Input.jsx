import React, { useState } from 'react'
import './input.css';

function Input({placeholder="Enter your name", name="email", type='text', label=''}) {
  const [place, setPlace] = useState(placeholder);
  return (
    <>
    <label htmlFor={name}>{label}</label>
    
    <input type={type} 
    placeholder={place}
    name={name}
    onClick={() => setPlace('')}
    ></input>
    </>
  )
}

export default Input