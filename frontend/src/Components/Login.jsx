import {Link} from "react-router-dom";
import { useState } from "react";
import React from 'react'
import '../Styles/Login.css'
import { useModal } from "../Context/ModalContext";
import {login} from '../Config/login.js'

export default function Login() {

    const [values, setValues] = useState ({
        email: "",
        password: "",
    });

    const handleLoginChange = (e)=> {
        const {name, value} = e.target
        setValues ( {
            ...values,
            [name]: value,
        });
    };
        
        const [error, setError] = useState ("");

        const {closeLogin, openRegister}= useModal();

        const handleSubmit = async (e) => {

            e.preventDefault();

            const { email, password } = values;

            if (email === "" || password === "") { 
                setError ("Usuario o contraseña incorrecta.")
                return;
            }
            try {
        const response = await login(email, password);

        console.log("Inicio de sesión exitoso:", response);

        closeLogin();
    } catch (error) {
        setError("Error al iniciar sesión. Verificá tus datos.");
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
                    name="email"
                    placeholder="tucorreo@gmail.com" 
                    value={values.email}
                    onChange={handleLoginChange} />
                </div>
        <div className="form-group" >
                    <label > Contraseña </label>
                    <input 
                    type="password" 
                    name="password"
                    placeholder="Tu contraseña" 
                    value={values.password}
                    onChange={handleLoginChange} />
                </div>
                <button type="submit" className='back-btn'> Acceder </button>
                <button className='back-btn' onClick={openRegister}> Registrarse </button>
            </form>
        </section>
    );
}
