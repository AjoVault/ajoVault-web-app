import React from 'react'
import './lilacbutton.css'

function LilacButton({type='submit', title='Click Me' , onClick}) {
  return (
    <>
        <button className='lilacBtn' type={type}
          onClick={(e) => {onClick && onClick(e.target.vlaue)}}
        >
        {title}
        </button>
    </>
  )
}

export default LilacButton