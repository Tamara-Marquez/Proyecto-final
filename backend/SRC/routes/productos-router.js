import { Router } from "express";
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from "../controller/productos-controller.js";
import { validateId, validateCreateProduct, validateUpdateProduct, validateDeleteProduct,  } from "../middleware/producto-validator.js";
import { isAdmin } from "../middleware/roles-validator.js";
import {isAutenticated} from "../middleware/usuarios-validator.js"
const router= Router();



router.get('/productos', getAllProductsController);
router.get('/productos/:id', validateId, getProductByIdController); 
router.post('/productos', validateCreateProduct, createProductController);
router.put('/productos/:id', validateUpdateProduct, updateProductController);
router.delete('/productos/:id', validateDeleteProduct, deleteProductController);

export default router;