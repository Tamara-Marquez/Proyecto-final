import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Login.css'
import { useModal } from '../Context/ModalContext';

export default function Register() {
    const [name, setName]= useState ("");
    const [email, setEmail]= useState ("");
    const [password, setPassword]= useState ("");
    const [confirmPassword, setConfirmPassword]= useState ("");
    const [error, setError]= useState ("");
    const [success, setSuccess]= useState ("");

    const {closeRegister, openLogin} = useModal()

    const handleSubmit = (e) => { 
        e.preventDefault();
    

    if (!name || !email || !password || !confirmPassword) {
        setError ("Todos los campos son obligatorios.");
        setSuccess ("");
        return;
    }

    if (password !== confirmPassword) {
        setError ("Las contraseñas no coinciden.");
        setSuccess ("");
        return;
    }

    console.log ("Nuevo usuario: ", {name, email, password});
    setError("");
    setSuccess("¡Cuenta creada con éxito!");

    setTimeout (()=> {
        closeRegister();
        openLogin();
    }, 1000);
    
};

    return (
    <section className="welcome-container">
        <h2> Registrarse </h2>
        {error && <p className='error'> {error} </p>}
        {success && <p className='success'> {success} </p> }

        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label > Nombre completo </label>
                <input
                    type="text" 
                    placeholder="Nombre y Apellido" 
                    value= {name}
                    onChange={(e)=> setName (e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label > Correo electrónico </label>
                <input
                    type="email" 
                    placeholder="tucorreo@gmail.com" 
                    value= {email}
                    onChange={(e)=> setEmail (e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label > Tu contraseña </label>
                <input
                    type="password" 
                    placeholder="Tu contraseña" 
                    value= {password}
                    onChange={(e)=> setPassword (e.target.value)}
                />
            </div>
            <button type='submit' className='back-btn'> Crear cuenta </button>
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
