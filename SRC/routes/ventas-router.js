import { Router } from "express";
import {
    createVenta,
    getVentas,
    getVentaById,
    updateVenta,
    deleteVenta
} from "../controllers/ventas.controller.js";

import {
    createVentaValidator,
    updateVentaValidator,
    getVentaByIdValidator,
    deleteVentaValidator
} from "../validators/ventas.validator.js";

import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

// Crear venta
router.post("/", createVentaValidator, validate, createVenta);

// Listar ventas
router.get("/", getVentas);

// Obtener venta por ID
router.get("/:id", getVentaByIdValidator, validate, getVentaById);

// Actualizar venta
router.put("/:id", updateVentaValidator, validate, updateVenta);

// Eliminar venta
router.delete("/:id", deleteVentaValidator, validate, deleteVenta);

export default router;


router.get ('/ventas');
router.get ('/usuario/:id');
router.post('/venta');

