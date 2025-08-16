
import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";

// Importar los validadores y el controlador
import {
  createVentaValidator,
  updateVentaValidator,
  getVentaByIdValidator,
  deleteVentaValidator,
} from "../validators/ventas.validator.js";
import {
  createVenta,
  updateVenta,
  getVentaById,
  deleteVenta,
} from "../controllers/ventas.controller.js";

const router = Router();

// Middleware para manejar los resultados de la validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rutas de ventas
router.post(
  "/",
  createVentaValidator,
  handleValidationErrors,
  createVenta
);

router.put(
  "/:id",
  updateVentaValidator,
  handleValidationErrors,
  updateVenta
);

router.get(
  "/:id",
  getVentaByIdValidator,
  handleValidationErrors,
  getVentaById
);

router.delete(
  "/:id",
  deleteVentaValidator,
  handleValidationErrors,
  deleteVenta
);

export default router;


