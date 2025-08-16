// ventas.validator.js
import { body, param } from "express-validator";

export const createVentaValidator = [
    body("fecha")
        .notEmpty().withMessage("La fecha es obligatoria")
        .isISO8601().withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)"),
    body("total")
        .notEmpty().withMessage("El total es obligatorio")
        .isFloat({ gt: 0 }).withMessage("El total debe ser un número mayor a 0"),
    body("cliente_id")
        .notEmpty().withMessage("El cliente es obligatorio")
        .isInt({ gt: 0 }).withMessage("El cliente_id debe ser un número entero positivo"),
];

export const updateVentaValidator = [
    param("id")
        .isInt({ gt: 0 }).withMessage("El ID debe ser un número entero positivo"),
    body("fecha")
        .optional()
        .isISO8601().withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)"),
    body("total")
        .optional()
        .isFloat({ gt: 0 }).withMessage("El total debe ser un número mayor a 0"),
    body("cliente_id")
        .optional()
        .isInt({ gt: 0 }).withMessage("El cliente_id debe ser un número entero positivo"),
];

export const getVentaByIdValidator = [
    param("id")
        .isInt({ gt: 0 }).withMessage("El ID debe ser un número entero positivo"),
];

export const deleteVentaValidator = [
    param("id")
        .isInt({ gt: 0 }).withMessage("El ID debe ser un número entero positivo"),
];
