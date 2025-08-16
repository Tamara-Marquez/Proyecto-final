import { getUsers, getUsersById, createUser, deleteUserById, updataUserById, findUserByEmail } from "../model/usuarios-model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import 'dotenv/config';

//Obtener Usuario

const getAll = async (req, res) => {
    try {
        const user = await getUsers();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json ({menssage: error.menssage}); 
    }
}; 

const getById = async (req, res) => {
    try {
        const user = await getUsersById (req.param.id);
        if (!user) {
        return res.status (404).json({menssage: "No se encuentra el usuario con ese ID"});
    }
    res.status(500).json({message: `El usuario obtenido es ${user}` });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// registar y loguear usuario

const registerUser = async (req, res) =>{
    try {
        const {nombre, apellido, email, password, id_rol}= req.body; 
        if (!nombre || !apellido || !email || !password ||id_rol) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    };
    
    const mail = String(email).toLowerCase().trim();
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: "El email del usuario ya existe" });
    };
   
    const hashedPass = await bcrypt.hash(pass, 10);
    const newUser= await createUser ({
        nombre,
        apellido,
        email,
        password: hashedPass
    });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

const login = async (req, res) => {
    
    const SECRET_KEY = process.env.SECRET_KEY;
    const expiresIn = process.env.TOKEN_EXPIRATION || '600s';

    if (!SECRET_KEY) {
        return res.status(500).json({ message: "Falta la clave"});
    };

    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status (400).json({message : "El email y contraseñas son obligatorios"});
        }

    const userFromDB= await findUserByEmail(email);
        if (!userFromDB){
            return res.status(401).json({message: "Email incorrecto"})
        }

    const ok = await bcrypt.compare(password, existingUser.password);
    if (!ok){
        return res.status(401).json({ message: "Contraseña incorrecta"});
    }

    const payload = {
        nombre: userFromDB.nombre,
        apellido: userFromDB.apellido,
        email: userFromDB.email,
        id: userFromDB.id_rol
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    
    return res.status(200).json({ user: payload, token });
}catch(error) {
    return res.status(error.status || 500).json({ message: error.message || 'Error en el servidor' });
  
}};





// Actualizar usuario

const updataById= async (req, res) =>{
    try {
        const updata= await updataUserById (req.params.id, req.body);
        if (!updata) {
            return res.status(404).json ({message: "Usuario no encontrado"});
        }
        res.status(200).json({message: "Usuario actualizado con éxito."}); 
    } catch (error) {
      res.status(500).json({message: error.message});  
    }
};



//Eliminar Usuario

const deleted= async (req, res) => {
    try {
        const deleted = await deleteUserById (req.params.id);
        if (!deleted) {
            return res.status (404).json ({message: "Usuario no encontrado"});
        }
        res.status (204).json ({message: "Usuario eliminado con éxito"});
    } catch (error) {
        res.status(500).json ({message: error.message});
    }
};


export {login, registerUser, deleted, updataById, getAll, getById}; 



