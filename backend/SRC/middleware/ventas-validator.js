import { check, param, validationResult } from "express-validator";

// Validación para crear una venta
export const validarVenta = [
  check("id_usuario")
    .notEmpty().withMessage("El id_usuario es obligatorio")
    .isInt({ gt: 0 }).withMessage("El id_usuario debe ser un número entero positivo"),

  check("id_producto")
    .notEmpty().withMessage("El id_producto es obligatorio")
    .isInt({ gt: 0 }).withMessage("El id_producto debe ser un número entero positivo"),

  check("total")
    .notEmpty().withMessage("El total es obligatorio")
    .isFloat({ gt: 0 }).withMessage("El total debe ser un número decimal positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validación de ID por parámetro (para obtener o eliminar venta)
export const validarIdVenta = [
  param("id")
    .isInt({ gt: 0 }).withMessage("El ID de la venta debe ser un número entero positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


