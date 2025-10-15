import axios from "axios";
import { API_URL } from "./api.js";


const axiosConfig = axios.create ({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosConfig.interceptors.request.use (
    (config) => {
        const token = localStorage.getItem("token");
            console.log("🔍 URL:", config.url);
            console.log("🔍 Método:", config.method);
            console.log("🔑 Token:", token);
            console.log("📤 Headers completos:", config.headers);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log("📤 Headers completos:", config.headers);
        }
        return config;
    },
    (error) => {
        console.error ("Error en petición:", error);
        return Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use (
    (response) => response,
    (error) => {
        if (error.response) {
            console.error ("Error en respuesta:", error.response);
            if (error.response.status === 401) {
                console.warn ("No autorizado, redirigiendo...");
                localStorage.removeItem("token");
                window.location.href = "/";

            }
        } else if (error.request) {
            console.error ("No se recibio respuesta del servidor");
        } else {
            console.error ("Error al configurar la petición: ", error.message);
        }
        return Promise.reject(error);
    }
)


export default axiosConfig;