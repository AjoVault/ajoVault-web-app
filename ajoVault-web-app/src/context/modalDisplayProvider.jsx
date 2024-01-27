import React, { useState } from "react";

import ModalDisplayContex from "./modalDisplay";

const ModalContextProvider = ({children}) => {
    const [display, setDisplay] = useState('none');
    const [otpModal, setOtpModal] = useState('none');
    return(
        <ModalDisplayContex.Provider value={ {display, setDisplay, otpModal, setOtpModal, }}>
            {children} 
        </ModalDisplayContex.Provider>
    )
}

export default ModalContextProvider;