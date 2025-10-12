import {Link} from "react-router-dom";
import { useState } from "react";
import React from 'react'
import '../Styles/Login.css'
import { useModal } from "../Context/ModalContext";
import { useAuth } from "../Context/auth.jsx";
import {login} from '../Config/login.js'

export default function Login() {

    const [values, setValues] = useState ({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { closeLogin, openRegister } = useModal();
    const { loginUser } = useAuth();

    const handleLoginChange = (e)=> {
        const {name, value} = e.target
        setValues ( {
            ...values,
            [name]: value,
        });
        if (error) setError("");
    };

        const handleSubmit = async (e) => {

            e.preventDefault();

            const { email, password } = values;

            if (email === "" || password === "") { 
                setError ("Usuario o contraseña incorrecta.")
                return;
            }

            setLoading(true);

            try {
        const response = await login(email, password);

        console.log("Inicio de sesión exitoso:", response);
        loginUser(response.token, response.decoded);

        closeLogin();

    } catch (error) {
        setError("Error al iniciar sesión. Verificá tus datos.");
    }

    finally {
            setLoading(false);
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
                    onChange={handleLoginChange} 
                    disabled={loading}
                    />
                </div>
            <div className="form-group" >
                    <label > Contraseña </label>
                    <input 
                    type="password" 
                    name="password"
                    placeholder="Tu contraseña" 
                    value={values.password}
                    onChange={handleLoginChange}
                    disabled={loading}/>
                </div>
                <button 
                type="submit" 
                    className='back-btn'
                    disabled={loading}> 
                    {loading ? "Iniciando..." : "Acceder"}
                </button>
                
                <button 
                className='back-btn'
                type="submit"
                onClick={openRegister}
                disabled={loading}>
                    Registrarse 
                </button>
            </form>
        </section>
    );
}
