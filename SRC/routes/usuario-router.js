import { Router } from "express";
import { getAll, getById, create, deleted, updataById } from "../controller/usuario-controller.js";

const router = Router ();


router.get ('/usuario', getAll);
router.get ('/usuario/:id', getById);
router.post('/usuario', create);
router.post('/usuario', create);//login arreglar y crear
router.put('/usuario/:id', updataById);
router.delete ('/usuario/:id', deleted);