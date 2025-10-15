import {getProducts ,getProductsById, createProducts, updateProduct, deleteProduct } from "../model/productos-model.js";

// export const getAllProductsController = async (req, res) => {
//     try {
//         const productos = await getProducts();
//         res.status(200).json(productos);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Ocurrió un error al obtener los productos",
//             error: error.message
//         });
//     }
// };

export const getAllProductsController = async (req, res) => {
    try {
        const { search } = req.query;
        const productos = await getProducts(search);
        
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error en getAllProductsController:', error);
        res.status(500).json({
            message: "Ocurrió un error al obtener los productos",
            error: error.message
        });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params; 
        const producto = await getProductsById(id);

        if (!producto) {
            return res.status(404).json({ message: `No se encontró el producto con id ${id}` });
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ocurrió un error al obtener el producto",
            error: error.message
        });
    }
};

export const createProductController = async (req, res) => {
    try {
        const producto = req.body;
        const nuevoProducto = await createProducts(producto);
        res.status(201).json({
            message: "Producto creado con éxito",
            producto: nuevoProducto
        });
    } catch (error) {
        console.error("Error en crear el producto:", error.message);
        res.status(500).json({ error: "No se pudo crear el producto" });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;       
        const datosActualizados = req.body; 
        const productoActualizado = await updateProduct(id, datosActualizados);
        res.status(200).json({
            message: "Producto actualizado con éxito",
            producto: productoActualizado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductController = async (req, res) => {
    console.log("📍 req.params:", req.params);
    console.log("📍 req.params.id:", req.params.id);
    console.log("📍 Tipo:", typeof req.params.id);
    try {
        const { id } = req.params;
        const resultado = await deleteProduct(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};