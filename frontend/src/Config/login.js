import React from "react";  
import { API_URL } from "../Config/api.js";

export async function login(email, password) {

    const datosUsuarios = {
        email,
        password
    };

    console.log("Enviando a login:", datosUsuarios);
    try {
        const parametros = {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(datosUsuarios)
        }; 

        const res = await fetch(`${API_URL}/usuario/login`, parametros);

        if (!res.ok) {
            throw new Error("Error al obtener el usuario");
        }

    const body = await res.json();
    console.log("Respuesta del servidor:", body);
    return body;

} catch (error) {
    console.error("Error en el fetch:", error.message);
    throw error;
}
};

