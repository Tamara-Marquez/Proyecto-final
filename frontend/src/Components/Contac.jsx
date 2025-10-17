import React from "react";
import { useState} from "react";
import '../Styles/Contact.css'
import { toast } from "react-toastify";
import { ConfigToasty } from "../Config/Toasty";

const Contact = () => {
    const [values, setValues]= useState ({
        name : "",
        lastName : "",
        email : "",
        phone : "",


    });

    const handleInputChange =(e)=>{
        const {name, value}= e.target
        setValues ({
            ...values,
            [name] : value,
        });
    };

    const handleForm = (e)=> {
        e.preventDefault ();
        toast.success("Gracias por contactarse", ConfigToasty);
        console.log (values)
    };


return (
    <div className="contact-container">
        <form className="contact-form" onSubmit={handleForm}>
            <h2  className="contact-title"> Contáctanos 📞 </h2>
            <input
            type="text"
            name="name"
            value={values.name}
            placeholder="Escriba su nombre "
            required
            className="contact-input"
            onChange={handleInputChange}
            />

            <input
            type="text"
            name="lastName"
            value={values.lastName}
            placeholder="Escriba su apellido " 
            required
            className="contact-input"
            onChange={handleInputChange}
            />

            <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Escriba su correo " 
            required
            autoComplete="off"
            className="contact-input"
            onChange={handleInputChange}
            />

            <input
            type="tel"
            name="phone"
            value={values.phone}
            placeholder="Escriba su número de celular "
            size="20"
            required
            className="contact-input"
            onChange={handleInputChange}
            />

            <textarea 
            name="consult"
            placeholder="Escriba su consulta aquí"
            minLength="10" 
            maxLength="500" 
            spellCheck = "true"
            className="contact-textarea"
            ></textarea>

            <button 
            type="submit" 
            name="myButton" 
            value="Submit" 
            autoFocus
            className="contact-button"
            >
                Enviar Formulario
            </button>
        </form>
    </div>
)
};

export default Contact;