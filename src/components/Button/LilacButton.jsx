import React from 'react'
import './lilacbutton.css'
import {Link} from 'react-router-dom'

function LilacButton({type='submit', title='Click Me' , onClick, 
  color='var(--lilac)', textColor='white', width='100%',
}) {
  const btnStyle = {
    backgroundColor: color,
    color: textColor,
    width: width
  }
  return (
    <>
        <button className='lilacBtn' 
        // style={btnStyle}
        type={type}
        onClick={(e) => {onClick && onClick(e.target.vlaue)}}
        // onSubmit={(e) => {submit && submit(e.target.vlaue)}}
            >
            {title}
            </button>

       
    </>
  )
}

export default LilacButton