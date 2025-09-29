import {get, getById, create, deleteById, update} from "../model/roles-model.js"


//Obtener Usuario

const getRoles = async (req, res) => {
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