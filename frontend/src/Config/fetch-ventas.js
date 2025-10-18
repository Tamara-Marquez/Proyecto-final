import axiosConfig from './config-axios.js';

export async function crearVenta(ventaData) {
    try {
        const response = await axiosConfig.post("/ventas", ventaData);
    return response.data;
} catch (error) {
    console.error("Error al crear venta:", error.response?.data || error.message);
    throw error;
}
};

export async function ObtenerVentas() {
    try {
        const response = await axiosConfig.get("/ventas");
    return response.data;
} catch (error) {
    console.error("Error al obtener las ventas", error.response?.data || error.message);
    throw error;
}
};

// export const obtenerVentasUsuario = async (idUsuario) => {
//     if (!idUsuario) {
//         console.error("ID de usuario inválido:", idUsuario);
//         return [];
// }

//     try {
//         const response = await axiosConfig.get(`/ventas/cliente/${idUsuario}`);
//     return response.data;
// } catch (error) {
//     console.error("Error al obtener ventas del usuario:", error.response?.data || error.message);
//     throw error;
// }
// };

export const obtenerVentasUsuario = async (idUsuario) => {
    if (!idUsuario) {
        console.error("❌ ID de usuario inválido en fetch-ventas:", idUsuario);
        throw new Error("ID de usuario inválido");
    }

    try {
        console.log("📦 Consultando ventas del usuario:", idUsuario);
        const response = await axiosConfig.get(`/ventas/cliente/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener ventas del usuario:", error.response?.data || error.message);
        throw error;
    }
};
