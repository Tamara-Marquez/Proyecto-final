import { getUsers, getUsersById, createUser, deleteUserbyId, updataUserById } from "../model/usuarios-model.js";




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
        return res.status (404).json({menssage: "the user with the ID not found"});
    }
    res.status(500).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const create = async (req, res) => {
    try {
        const newUser= await createUser (req.body);
        res.status(201).json (newUser);
    } catch (error) {
        res.status(500).json ({message: error.message});
    }
}; 



const updataById= async (req, res) =>{
    try {
        const updata= await updataUserById (req.params.id, req.body);
        if (!updata) {
            return res.status(404).json ({message: "User not found"});
        }
        res.status(200).json({message: "User updata successfully"}); 
    } catch (error) {
      res.status(500).json({message: error.message});  
    }
};


const deleted= async (req, res) => {
    try {
        const deleted = await deletedUserbyId (req.params.id);
        if (!deleted) {
            return res.status (404).json ({message: "User not found"});
        }
        res.status (204).json ({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json ({message: error.message});
    }
};


export {create, deleted, updataById, getAll, getById}; 