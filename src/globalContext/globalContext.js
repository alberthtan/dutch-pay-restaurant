import React, { useState, createContext} from "react";

console.log("CALLING GLOBAL CONTEXT")

const Context = createContext()

const Provider = ( { children } ) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userObj, setUserObj] = useState(false)
    
    const setToken = async (refresh, access) => {
        localStorage.setItem('refresh', refresh)
        localStorage.setItem('access', access)
    }

    const globalContext = {
        isLoggedIn,
        setIsLoggedIn,
        userObj,
        setUserObj,
        setToken,
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };