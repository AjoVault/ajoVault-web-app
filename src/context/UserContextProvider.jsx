import React, {useState} from "react";
import UserContext from "./userContext";


export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
