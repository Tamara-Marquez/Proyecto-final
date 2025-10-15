import { API_URL } from "./api.js";
import {jwtDecode} from 'jwt-decode';

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
        const body = await res.json();
        console.log("Respuesta del servidor:", body);
        
        if (!res.ok) {
            throw new Error(body.message || "Error al iniciar sesión");
        }

        if (!body.token) {
            throw new Error("Token no recibido desde el servidor");
        }

        localStorage.setItem("token", body.token);

        const decoded = jwtDecode(body.token);
        console.log("Rol decodificado:", decoded.id_rol);

        if (decoded.id_rol) {
            localStorage.setItem("rol", decoded.id_rol);
        };
        return {
            token: body.token,
            usuario: body.usuario || null,
            decoded: decoded
        };

    } catch (error) {
    console.error("Error en el fetch:", error.message);
    throw error;
}
};


export async function register(nombre, apellido,email, password) {

    const datosUsuarios = {
        nombre,
        apellido,
        email,
        password,
        id_rol: 2
    }

    try {

        const parametros = {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(datosUsuarios)
        }
        const res = await fetch(`${API_URL}/usuario/registro`, parametros);
        const body = await res.json();
        console.log("Respuesta del servidor:", body);
        if (!res.ok) {
            throw new Error(body.message || "Error al registrar el Usuario");
        }
        return body;
    } catch (error) {
        console.error("Error en el fetch:", error.message);
    throw error;
    }
};
