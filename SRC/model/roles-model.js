import {pool} from "../config/bd.js"

// obtener todos los roles y rol por ID  

const get =  async () => {
    try {
        const query = "SELECT * FROM usuario";
        const [rows] = await pool.query (query);
        return "Los usuarios son: " + rows; 
    } catch (error) {
        console.error("Error al obtener el rol", error);
        throw new Error("No se pudieron obtener los de la base de datos");
        
    }
};

const getById = async (id) => {
    try {
        const query = "SELECT * FROM rol WHERE id_rol =?";
        const [rows] = await pool.query (query, [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0]; 
    } catch (error) {
       console.error(`Error al obtener rol del usuario con ID ${id}:`, error);
    throw new Error(`No se pudo obtener el rol de usuario  ${id} en la base de datos`);

    }
};
 
// actualizar un usuario por id 

const update = async (id, nombre_rol) => {
    try{
  const [result] = await pool.query("UPDATE Rol SET nombre_rol = ? WHERE id_rol = ?", [nombre_rol, id]);
  return result.affectedRows > 0;
}
 catch (error) {
    console.error(`Error al encontrar al usuario con el ID ${id}:`, error);
    throw new Error(`No se encontro el usuario ${id} en la base de datos.`);
  }
};


// crear un nuevo rol
const create = async (nombre_rol) => {
    try {
        const [result] = await pool.query("INSERT INTO Rol (nombre_rol) VALUES (?)", [nombre_rol]);
  return { id: result.insertId, nombre_rol };
    } catch (error) {
        console.error("error al crear el nuevo rol", error);
    throw new Error("No se pudo crear el nuevo rol en la base de datos");
    }
};


// eliminar un rol

const deleteById = async (id) => {
    try {
        const query = "DELETE FROM rol WHERE id_rol = ? ";
        const [result] = await pool.query (query, [id]); 
        return result.affectedRows > 0;
    } catch (error) {
         console.error(`Error al encontrar rol  ${id}:`, error);
    throw new Error(`No se encontro el rol del usuario  ${id} en la base de datos`);
    }
}; 

export {get, getById, create, deleteById, update};