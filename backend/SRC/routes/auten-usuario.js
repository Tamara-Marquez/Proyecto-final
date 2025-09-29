import { Router } from "express";
import {login, registerUser} from "../controller/usuario-controller.js"
import {valCreateUser,  isAutenticated} from "../middleware/usuarios-validator.js"


const router = Router ();

router.post('/usuario',valCreateUser, registerUser);
router.post('/usuario/login',isAutenticated,login);

export default router;