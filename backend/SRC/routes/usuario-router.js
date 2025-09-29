import { Router } from "express";
import { valUserById, valUpdataUser} from "../middleware/usuarios-validator.js"
import { deleted, updataById, getAll, getById} from "../controller/usuario-controller.js"

const router = Router ();


router.get ('/usuario', getAll);
router.get ('/usuario/:id',valUserById, getById);
router.put('/usuario/:id',valUpdataUser, updataById);
router.delete ('/usuario/:id',valUserById, deleted);

export default router;