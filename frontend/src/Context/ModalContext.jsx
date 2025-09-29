import { createContext, useState, useContext } from "react";

const ModalContext= createContext ();

export function ModalProvider ({children}) {
    const [showLogin, setShowLogin] = useState (false);
    const [showRegister, setShowRegister]= useState (false);

    const openLogin = () => {
        setShowRegister (false);
        setShowLogin (true);
    };

    const closeLogin = () => setShowLogin (false);

    const openRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const closeRegister = () => setShowRegister (false);

    return (
        <ModalContext.Provider value={ { showLogin, openLogin, closeLogin, showRegister, openRegister, closeRegister}}
        > {children} </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}