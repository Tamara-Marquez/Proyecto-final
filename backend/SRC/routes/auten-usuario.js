import { Router } from "express";
import {login, registerUser} from "../controller/usuario-controller.js"
import {valCreateUser} from "../middleware/usuarios-validator.js"


const router = Router ();

router.post('/usuario/registro',valCreateUser, registerUser);
router.post('/usuario/login',login);

export default router;