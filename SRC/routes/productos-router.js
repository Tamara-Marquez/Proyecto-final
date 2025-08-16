import { Router } from "express";
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from "../controller/productos-controller";
import { validateId, validateCreateProduct, validateUpdateProduct, validateDeleteProduct,  } from "../middleware/producto-validator";
const router= Router();


// Listar todos los productos
router.get('/productos', getAllProductsController);

// Obtener un producto por su id
router.get('/productos/:id', validateId, getProductByIdController); 

// Crear un producto
router.post('/productos', validateCreateProduct, createProductController);

// Actualizar un producto por id
router.put('/productos/:id', validateUpdateProduct, updateProductController);

// Eliminar un producto por id
router.delete('/productos/:id', validateDeleteProduct, deleteProductController);