import { getCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from "../model/categorias-model.js";

// Obtener todas las categorías
export const getAllCategoryController = async (req, res) => {
    try {
        const categorias = await getCategory();
        res.status(200).json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ocurrió un error al obtener las categorías",
            error: error.message
        });
    }
};

// Obtener categoría por ID
export const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await getCategoryById(id);

        if (!categoria) {
            return res.status(404).json({ message: `No se encontró la categoría con id ${id}` });
        }
        res.status(200).json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ocurrió un error al obtener la categoría",
            error: error.message
        });
    }
};

// Crear categoría
export const createCategoryController = async (req, res) => {
    try {
        const categoria = req.body;
        const newCategoria = await createCategory(categoria);
        res.status(201).json({
            message: "Categoría creada con éxito",
            categoria: newCategoria
        });
    } catch (error) {
        console.error("Error en crear la categoría:", error.message);
        res.status(500).json({ message: "No se pudo crear la nueva categoría", error: error.message });
    }
};

// Actualizar categoría
export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const categoriaActualizada = await updateCategory(id, datosActualizados);

        res.status(200).json({
            message: "Categoría actualizada con éxito",
            categoria: categoriaActualizada
        });
    } catch (error) {
        if (error.message === "Categoría no encontrada") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al actualizar la categoría", error: error.message });
    }
};

// Eliminar categoría
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await deleteCategory(id);
        res.status(200).json(resultado);
    } catch (error) {
        if (error.message === "Categoría no encontrada") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al eliminar la categoría", error: error.message });
    }
};
