import React from 'react'
import "./spinner.css"

function Spinner({display='none'}) {

  let spinnerStyle = {
   display: display
  }

  return (
    <div className="loader-container" style={spinnerStyle}>
    <div className="loader"></div>
  </div>
  )
}

export default Spinner