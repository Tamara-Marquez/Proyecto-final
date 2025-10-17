import { Router } from "express";
import {getAllCategoryController,getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController} from "../controller/categorias-controller.js";
import {validateCategoryId,validateCreateCategory,validateUpdateCategory,validateDeleteCategory} from "../middleware/categoria-validator.js";
import { isAdmin } from "../middleware/roles-validator.js";
import {isAutenticated} from "../middleware/usuarios-validator.js"

const router = Router();

router.get('/categoria', getAllCategoryController);
router.get('/categoria/:id', validateCategoryId, getCategoryByIdController);
router.post('/categoria', validateCreateCategory, createCategoryController);
router.put('/categoria/:id', validateUpdateCategory, updateCategoryController);
router.delete('/categoria/:id', validateDeleteCategory, deleteCategoryController);

export default router;


