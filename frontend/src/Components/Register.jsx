import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Login.css'
import { useModal } from '../Context/ModalContext';
import { register } from '../Config/fetch-login.js';
import { FaSpinner } from "react-icons/fa";

export default function Register() {
    const [error, setError]= useState ("");
    const [success, setSuccess]= useState ("");
    const [loading, setLoading] = useState(false);
    
    const [values, setValues]= useState ({
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            confirmPassword:"",
    });

    const handleRegisterChange= (e) => {
        const {name, value} = e.target 
        setValues ({
            ...values,
            [name] : value,
        });
    };

    const {closeRegister, openLogin} = useModal()

    const handleSubmit = async(e) => { 
        e.preventDefault();
        const {nombre, apellido, email, password, confirmPassword} = values;

        if (!nombre || !apellido || !email || !password || !confirmPassword) {
        setError ("Todos los campos son obligatorios.");
        setSuccess ("");
        return;
        }

        if (password !== confirmPassword) {
        setError ("Las contraseñas no coinciden.");
        setSuccess ("");
        return;
        }

        setLoading (true);

        try {
            const body= await register(nombre, apellido, email, password);
            
        setError("");
        setSuccess("¡Cuenta creada con éxito!");

        setTimeout(() => {
        closeRegister();
        openLogin();
        }, 1000);

    } catch (error) {
        console.error("Error:", error);
        setError(error.message || "Error en el servidor");
        setSuccess("");
    } finally {
        setLoading(false);
    }
};

    return (
    <section className="welcome-container-register">
        <h2> Registrarse </h2>
        {error && <p className='error-register'> {error} </p>}
        {success && <p className='success-register'> {success} </p> }

        <form onSubmit={handleSubmit}>
            <div className='form-group-register'>
                <label > Nombre </label>
                <input
                    type="text" 
                    name='nombre'
                    placeholder="Nombre"
                    value= {values.nombre}
                    onChange={handleRegisterChange}
                />
            </div>
            <div className='form-group-register'>
                <label >Apellido </label>
                <input
                    type="text" 
                    name='apellido'
                    placeholder="Apellido"
                    value= {values.apellido}
                    onChange={handleRegisterChange}
                />
            </div>
            <div className='form-group-register'>
                <label > Correo electrónico </label>
                <input
                    type="email"
                    name='email'
                    placeholder="tucorreo@gmail.com" 
                    value= {values.email}
                    onChange={handleRegisterChange}
                />
            </div>
            <div className='form-group-register'>
                <label > Tu contraseña </label>
                <input
                    type="password" 
                    name='password'
                    placeholder="Tu contraseña" 
                    value= {values.password}
                    onChange={handleRegisterChange}
                />
            </div>
            <div className='form-group-register'>
                <label > Repite tu contraseña </label>
                <input
                    type="password" 
                    name='confirmPassword'
                    placeholder="Tu contraseña nuevamente" 
                    value= {values.confirmPassword}
                    onChange={handleRegisterChange}
                />
            </div>
            <button 
            type='submit' 
            className='back-btn'
            disabled={loading}>
                {loading ? (
                <>
            <FaSpinner className="spinner" /> Creando cuenta...
                </>
                ) : (
                "Crear cuenta"
                )}
            </button>
            <button
            type='button'
            className='back-btn'
            onClick={()=> {
                closeRegister ();
                openLogin();}}> Ya tengo cuenta </button>
        </form>
    </section>
);
}
