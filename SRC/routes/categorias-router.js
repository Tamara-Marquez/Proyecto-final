import { Router } from "express";
const router = Router();

/*
create= crear una nueva categoria
get = obtener una categoria
get: id =obtener una categoria por id
delete:id= eliminar una categoria

*/

router.get ('/categorias');
router.get ('/categorias/:id');
router.get ('/categorias/:id/producto');
router.post('/categoria');
router.put('/categoria');
router.put ('/categoria/id');
router.delete ('/categoria/id');