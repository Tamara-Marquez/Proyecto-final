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
        const user = await getUsersById (req.params.id);
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

        if (!nombre || !apellido || !email || !password ||!id_rol) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
    };
    
        const emailNormalized = email.toLowerCase().trim();
        const existingUser = await findUserByEmail(emailNormalized);

    if (existingUser) {
    return res.status(409).json({ message: "El email del usuario ya existe" });
    };


    const newUser= await createUser ({
        nombre,
        apellido,
        email: emailNormalized,
        password,
        id_rol
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
    
//     const {email, password} = req.body

//     const SECRET_KEY = process.env.SECRET_KEY;
//     const expiresIn = process.env.TOKEN_EXPIRATION || '600s';

//     if (!SECRET_KEY) {
//         return res.status(500).json({ message: "Falta la clave"});
//     };

//     const emailNormalized = email.toLowerCase().trim();
// console.log("Buscando usuario con email:", emailNormalized);
// const userFromDB = await findUserByEmail(emailNormalized);
// console.log("Usuario encontrado:", userFromDB);

//     try {
        
//         if (!email || !password) {
//             return res.status (400).json({message : "El email y contraseñas son obligatorios"});
//         }

//         const userFromDB = await findUserByEmail(email.toLowerCase().trim());
//         console.log("Usuario encontrado:", userFromDB);
//         if (!userFromDB){
//             return res.status(401).json({message: "Email incorrecto"})
//         }


//     const ok = await bcrypt.compare(password, userFromDB.password);
//         if (!ok){
//             return res.status(401).json({ message: "Contraseña incorrecta" });
//         }

//     const payload = {
//         nombre: userFromDB.nombre,
//         apellido: userFromDB.apellido,
//         email: userFromDB.email,
//         id: userFromDB.id_rol
//     };
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    
//     return res.status(200).json({ user: payload, token });
// }catch(error) {
//     return res.status(error.status || 500).json({ message: error.message || 'Error en el servidor' });

// }};
try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "El email y contraseña son obligatorios" });
        }

        const emailNormalized = email.toLowerCase().trim();
        console.log(" Buscando email:", emailNormalized);

        const userFromDB = await findUserByEmail(emailNormalized);
        console.log(" Usuario encontrado:", userFromDB ? "SÍ" : "NO");
        
        if (!userFromDB) {
            console.log(" Email no encontrado en BD");
            return res.status(401).json({ message: "Email incorrecto" });
        }

        console.log("Password ingresado:", password);
        console.log("Hash en BD:", userFromDB.password);

        const ok = await bcrypt.compare(password, userFromDB.password);
        if (!ok) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        
        const token = jwt.sign (
            {
            id_usuario: userFromDB.id_usuario,
            nombre: userFromDB.nombre,
            apellido: userFromDB.apellido,
            email: userFromDB.email,
            id_rol: userFromDB.id_rol
        },
        process.env.SECRET_KEY,
        {
        expiresIn: process.env.TOKEN_EXPIRATION,
    }
    );
    console.log("🎉 Login exitoso");

    res
    .status(200)
    .json({ usuario: userFromDB.nombre + userFromDB.apellido, token: token });

    } catch (error) {
        console.error("Error en loginUser:", error);
        return res.status(500).json({ message: error.message });
    }
};



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



