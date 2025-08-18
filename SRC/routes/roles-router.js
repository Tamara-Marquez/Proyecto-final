import { Router } from "express";
import {valCreateUser, valUserById, valUpdataUser} from "../middleware/usuarios-validator.js"


const router = Router ();

router.get ('/Rol', getAll);
router.get ('/Rol/:id',valUserById, getById);
router.post('/Rol',valCreateUser, registerUser);
router.put('/Rol/:id',valUpdataUser, updataById);
router.delete ('/Rol/:id',valUserById, deleted);

export default router;