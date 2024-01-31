import React from 'react'
import './lilacbutton.css'
import {Link} from 'react-router-dom'

function LilacButton({type='submit', title='Click Me' , onClick, submit}) {
  return (
    <>
        <button className='lilacBtn' 
        type={type}
        onClick={(e) => {onClick && onClick(e.target.vlaue)}}
        onSubmit={submit}
            >
            {title}
            </button>

       
    </>
  )
}

export default LilacButton