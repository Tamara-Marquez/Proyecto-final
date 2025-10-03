import { Router } from "express";
import {getAllCategoryController,getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController} from "../controllers/categorias-controller.js";
import {validateCategoryId,validateCreateCategory,validateUpdateCategory,validateDeleteCategory} from "../middlewares/categorias-middleware.js";
import { isAdmin } from "../middleware/roles-validator.js";

const router = Router();

router.get('/categoria', getAllCategoryController);
router.get('/categoria/:id', validateCategoryId, getCategoryByIdController);
router.post('/categoria', isAdmin, validateCreateCategory, createCategoryController);
router.put('/categoria/:id', isAdmin, validateUpdateCategory, updateCategoryController);
router.delete('/categoria/:id', isAdmin, validateDeleteCategory, deleteCategoryController);

export default router;


