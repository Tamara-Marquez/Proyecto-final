import pool from "../config/bd.js"

//obtener todas las categorias

export const getCategory = async() => {
    try {
        const query = "SELEC * FROM categorias"
        const [rows]= await pool.query (query);
        return rows;
    } catch (error) {
        console.error("Error al obtener las categorias:", error);
        throw new Error("No se pudieron obtener las categorias de la base de datos");
        
    }
};

//obtener categorias por id

export const getCategoryById = async (id) => {
    try {
        const query = "SELECT * FROM categorias WHERE id_producto = ?";
        const [rows] = await pool.query(query, [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error al obtener la categoria con el id ${id}:`, error.message);
        throw new Error(`No se pudo obtener la categoria con id ${id} en la base de datos`);
    }
};

//crear una nueva categoria

export const createCategory = async (categorias) => {
    try {
        const {nombre } = categorias;

        const query = `
            INSERT INTO productos 
            (nombre) 
            VALUES (?)`;
        const [result] = await pool.query(query, [nombre]);
        const [rows] = await pool.query("SELECT * FROM categoria WHERE id = ?", 
            [result.insertId]);
        return rows[0];
    } catch (error) {
        console.error("Error al crear la categoria:", error.message);
        throw new Error("No se pudo crear la nueva categoria");
    }
};

//actualizar una categoria

export const updateCategory = async (id, categoria) => {
    try {
        const { nombre } = categoria;
        const query = `
            UPDATE categorias
            SET nombre = ?
            WHERE id_categoria = ?`;
        
        const [result] = await pool.query(query, [nombre, id]);

        if (result.affectedRows === 0) {
            throw new Error("Categoría no encontrada");
        }
        const [rows] = await pool.query("SELECT * FROM categorias WHERE id_categoria = ?", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error al actualizar categoría:", error.message);
        throw error;
    }
};

//eliminar una categoria

export const deleteCategory = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM categorias WHERE id_categoria = ?", [id]);

        if (result.affectedRows === 0) {
            throw new Error("Categoría no encontrada");
        }

        return { message: "Categoría eliminada correctamente" };
    } catch (error) {
        console.error("Error al eliminar la categoria:", error.message);
        throw new Error("No se pudo eliminar la categoria");
    }
};