import { Router } from "express";
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from "../controller/productos-controller.js";
import { validateId, validateCreateProduct, validateUpdateProduct, validateDeleteProduct,  } from "../middleware/producto-validator.js";
import { isAdmin } from "../middleware/roles-validator.js";

const router= Router();



router.get('/productos', getAllProductsController);
router.get('/productos/:id', validateId, getProductByIdController); 
router.post('/productos',isAdmin, validateCreateProduct, createProductController);
router.put('/productos/:id',isAdmin, validateUpdateProduct, updateProductController);
router.delete('/productos/:id',isAdmin, validateDeleteProduct, deleteProductController);

export default router;