import axiosConfig from './config-axios.js';

export async function crearVenta(ventaData) {
    try {
        const response = await axiosConfig.post("/ventas", ventaData);
    return response.data;
} catch (error) {
    console.error("Error al crear venta:", error.response?.data || error.message);
    throw error;
}
}