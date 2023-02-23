import React, { useState, createContext} from "react";
const Context = createContext()

const Provider = ( { children } ) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ws, setWs] = useState(null)

    const globalContext = {
        isLoggedIn,
        setIsLoggedIn,
        ws,
        setWs,
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };