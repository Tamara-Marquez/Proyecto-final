import { Router } from "express";
import {valCreateUser, valUserById, valUpdataUser, isAutenticated} from "../middleware/usuarios-validator.js"
import {login, registerUser, deleted, updataById, getAll, getById} from "../controller/usuario-controller.js"

const router = Router ();


router.get ('/usuario', getAll);
router.get ('/usuario/:id',valUserById, getById);
router.post('/usuario',valCreateUser, registerUser);
router.post('/usuario/login',isAutenticated,login);
router.put('/usuario/:id',valUpdataUser, updataById);
router.delete ('/usuario/:id',valUserById, deleted);