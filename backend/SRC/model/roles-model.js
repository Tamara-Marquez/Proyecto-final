import pool from "../config/bd.js";

// obtener todos los roles  
const getRoles = async () => {
    try {
        const query = "SELECT * FROM rol";
        const [rows] = await pool.query(query);
        return rows; 
    } catch (error) {
        console.error("Error al obtener los roles:", error);
        throw new Error("No se pudieron obtener los roles de la base de datos");
    }
};

// obtener rol por ID  
const getRoleById = async (id) => {
    try {
        const query = "SELECT * FROM rol WHERE id_rol = ?";
        const [rows] = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        return rows[0]; 
    } catch (error) {
        console.error(`Error al obtener el rol con ID ${id}:`, error);
        throw new Error(`No se pudo obtener el rol con ID ${id} en la base de datos`);
    }
};

// crear un nuevo rol
const createRole = async (nombre_rol) => {
    try {
        const [result] = await pool.query("INSERT INTO rol (nombre_rol) VALUES (?)", [nombre_rol]);
        return { id: result.insertId, nombre_rol };
    } catch (error) {
        console.error("Error al crear un rol:", error);
        throw new Error("No se pudo crear el rol en la base de datos");
    }
};

// actualizar un rol por id
const updateRoleById = async (id, nombre_rol) => {
    try {
        const [result] = await pool.query("UPDATE rol SET nombre_rol = ? WHERE id_rol = ?", [nombre_rol, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error al actualizar el rol con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el rol con ID ${id} en la base de datos.`);
    }
};

// eliminar un rol
const deleteRoleById = async (id) => {
    try {
        const query = "DELETE FROM rol WHERE id_rol = ?";
        const [result] = await pool.query(query, [id]); 
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error al eliminar el rol con ID ${id}:`, error);
        throw new Error(`No se pudo eliminar el rol con ID ${id} en la base de datos`);
    }
}; 

export { getRoles, getRoleById, createRole, updateRoleById, deleteRoleById };
