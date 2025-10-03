import { Router } from "express";
import { getRole, getAllRoles, createNewRole, updateRole, deleteRole} from "../controller/roles-controller.js";
import { valCreateRole, valRoleById, isAdmin } from "../middleware/roles-validator.js";
import {isAutenticated} from "../middleware/usuarios-validator.js"


const router = Router ();

router.get ('/rol',isAutenticated,  getAllRoles);
router.get ('/rol/:id',isAutenticated, valRoleById,  getRole);
router.post('/rol',isAutenticated,isAdmin, valCreateRole, createNewRole,);
router.put('/rol/:id',isAutenticated, isAdmin, valRoleById, valCreateRole, updateRole);
router.delete ('/rol/:id',isAutenticated,isAdmin, valRoleById, deleteRole);


export default router;