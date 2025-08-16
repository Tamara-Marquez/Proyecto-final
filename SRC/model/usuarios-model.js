import {pool} from "../config/bd.js"

// obtener todos los ususarios y usuario por ID  

const getUsers =  async () => {
    try {
        const query = "SELECT * FROM usuario";
        const [rows] = await pool.query (query);
        return "Todos los usuarios son: " + rows; 
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw new Error("No se pudieron obtener los usuarios de la base de datos");
        
    }
};

const getUsersById = async (id) => {
    try {
        const query = "SELECT * FROM usuario WHERE id_usuario =?";
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
        const query = " INSERT INTO Usuario (nombre, apellido, email, password, id_rol) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query (query, [nombre, apellido, email, password, id_rol]);
        return {id: result.insertId, ...user};
    } catch (error) {
        console.error("Error al crear un usuario", error);
        throw new Error("No se puedo encontrar el usuario en la base de datos.");
    }
};

const findUserByEmail= async (email) => {
    try {
        const query = "SELECT nombre, apellido, email, password FROM usuario WHERE email=?";
        const [rows]= await pool.execute (query, [email]);
        if (rows.length === 0) {
        return null;
    }
    return  rows[0];
    } catch (error) {
        console.error("Error al encontrar el usuario con ese email", error);
    }
};



// obtener un usuario por id 

const updataUserById = async (id, user) => {
    try {
        const {nombre, apellido, email, password, id_rol} = user; 
        const query = "UPDATA Usuario SET nombre = ?, apellido =?, email=?, password=?, id_rol=? WHERE id_usuario=?"; 
        const [result] = await pool.query (query [ nombre, apellido, email, password, id_rol, id]);
        return result.affectedRows > 0
    } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw new Error(`Could not update user with id ${id} in the database.`);
  }
};

// eliminar un usuario 

const deleteUserById = async (id) => {
    try {
        const query = "DELETE FROM Usuario WHERE id_usuario = ? ";
        const [result] = await pool.query (query, [id]); 
        return result.affectedRows > 0;
    } catch (error) {
         console.error(`Error deleting user with id ${id}:`, error);
    throw new Error(`Could not delete user with id ${id} from the database.`);
    }
}; 


export { getUsers, getUsersById, createUser, updataUserById, deleteUserById, findUserByEmail};