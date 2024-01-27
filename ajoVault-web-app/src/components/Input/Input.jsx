import React, { useState } from 'react'
import './input.css';

function Input({placeholder="Enter your name", name="email", type='text'}) {
  const [place, setPlace] = useState(placeholder);
  return (
    <>
    <input type={type} 
    placeholder={place}
    name={name}
    onClick={() => setPlace('')}
    ></input>
    </>
  )
}

export default Input