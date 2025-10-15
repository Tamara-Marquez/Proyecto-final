import axios from 'axios';
import { API_URL } from "./api.js";
import axiosConfig from './config-axios.js';

export async function getProducts () {
    try {
        const response = await axiosConfig.get('/productos');
        return response.data;
    } catch (error) {
        console.error ("Error al obtener todos los productos", error);
        throw error; 
    }
};


//crear
export async function createProduct(nuevoProducto) {
    try {
        const response= await axiosConfig.post('/productos', nuevoProducto);
        return response.data.producto;
    } catch (error) {
        console.error ("Error al crear el producto", error);
        throw error;
    }
    
};

//actualizar

export async function updateProduct(id,datosActualizados) {
    try {
        const response= await axiosConfig.put(`/productos/${id}`, datosActualizados);
        return response.data.producto;
    } catch (error) {
        console.error ("Error al crear el producto", error);
        throw error;
    }
    
};


//eliminar
export async function deleteProduct(id) {
    try {
        const response= await axiosConfig.delete(`/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error ("Error al eliminar el producto", error);
        throw error;
    }
    
};


