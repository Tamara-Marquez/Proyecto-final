import {Link} from "react-router-dom";
import { useState } from "react";
import React from 'react'
import '../Styles/Login.css'
import { useModal } from "../Context/ModalContext";


export default function Login() {
        const [email,setEmail]= useState("");
        const [password, setPassword] = useState ("");
        const [error, setError] = useState ("");

        const {closeLogin, openRegister}= useModal();

        const handleSubmit = (e) => {
            e.preventDefault();
            if (email === "" || password === "") { 
                setError ("Usuario o contraseña incorrecta.")
            }
            else {
                setError ("");
                console.log ("Iniciando sesión con:" , {email, password});
                closeLogin();
            }
        };

    
    return (
        <section className="welcome-container">
            <h2> Iniciar Sesión </h2>
            {error && <p className="error">{error} </p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <label > Correo electrónico</label>
                    <input 
                    type="email" 
                    placeholder="tucorreo@gmail.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
        <div className="form-group" >
                    <label > Contraseña </label>
                    <input 
                    type="password" 
                    placeholder="Tu contraseña" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='back-btn'> Acceder </button>
                <button className='back-btn' onClick={openRegister}> Registrarse </button>
            </form>
        </section>
    );
}
