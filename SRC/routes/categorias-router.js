import { Router } from "express";
const router = Router();


router.get ('/categorias');
router.get ('/categorias/:id');
router.get ('/categorias/:id/producto');
router.post('/categoria');
router.put('/categoria');
router.put ('/categoria/id');
router.delete ('/categoria/id');

export default router;