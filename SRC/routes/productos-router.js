import { Router } from "express";
const router= Router();

/*POST / → Crear producto

GET / → Listar productos

GET /categoria/:id → Productos por categoría

PUT /:id → Editar producto

DELETE /:id → Eliminar producto*/


router.get ('/producto');
router.get ('/categorias/:id');
router.post('/producto');
router.put('/categoria/:id');
router.delete ('/categoria/id');