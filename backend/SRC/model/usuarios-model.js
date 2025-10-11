import pool from "../config/bd.js"
import bcrypt from "bcryptjs";

// obtener todos los ususarios y usuario por ID  

const getUsers =  async () => {
    try {
        const query = "SELECT * FROM usuarios";
        const [rows] = await pool.query (query);
        return "Todos los usuarios son: " + rows; 
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw new Error("No se pudieron obtener los usuarios de la base de datos");
        
    }
};

const getUsersById = async (id) => {
    try {
        const query = "SELECT * FROM usuarios WHERE id_usuario =?";
        const [rows] = await pool.query (query, [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0]; 
    } catch (error) {
        console.error(`Error al obtener un usuario del id ${id}:`, error);
    throw new Error(`No se pudo obtener el usuario del id:  ${id} en la base de datos`);

    }
};

//crear y login de usuario 

const createUser = async (user) => {
    try {
        const { nombre, apellido, email, password, id_rol} = user; 

        // const hashedPass = await bcrypt.hash(password, 10);
        const hashedPass = await bcrypt.hash(password, 10); 

        const query = " INSERT INTO usuarios (nombre, apellido, email, password, id_rol) VALUES (?, ?, ?, ?, ?)";

        const [result] = await pool.query (query, [nombre, apellido, email, hashedPass, id_rol]);

        return {id: result.insertId,nombre, apellido, email, id_rol};

    } catch (error) {
        console.error("Error al crear un usuario", error);
        throw new Error("No se puedo crear el nuevo usuario");
    }
};

const findUserByEmail= async (email) => {
    try {
        const query = "SELECT  id_usuario, nombre, apellido, email, password, id_rol FROM usuarios WHERE email=?";

        const [rows]= await pool.execute (query, [email]);

        console.log("Resultado de findUserByEmail:", rows);

        if (rows.length === 0) {
        return null;
    }
    return  rows[0];
    } catch (error) {
        console.error("Error al encontrar el usuario con ese email", error);
        throw new Error("Error en la búsqueda del usuario");
    }
};



// actualizar un usuario por id 

const updataUserById = async (id, user) => {
    try {
        const {nombre, apellido, email, password, id_rol} = user; 
        const query = "UPDATE usuarios SET nombre = ?, apellido =?, email=?, password=?, id_rol=? WHERE id_usuario=?"; 
        const [result] = await pool.query (query, [ nombre, apellido, email, password, id_rol, id]);
        return result.affectedRows > 0
    } catch (error) {
    console.error(`Error al encontrar al usuario con el ID ${id}:`, error);
    throw new Error(`No se encontro el usuario ${id} en la base de datos.`);
}
};

// eliminar un usuario 

const deleteUserById = async (id) => {
    try {
        const query = "DELETE FROM usuarios WHERE id_usuario = ? ";
        const [result] = await pool.query (query, [id]); 
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Erro al encontrar al usuario del ID  ${id}:`, error);
    throw new Error(`No se encontro el usuario ${id} en la base de datos`);
    }
}; 


export { getUsers, getUsersById, createUser, updataUserById, deleteUserById, findUserByEmail};