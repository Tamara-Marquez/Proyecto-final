import { check, param, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validar ID en params
export const validateCategoryId = [
    param("id")
        .notEmpty().withMessage("El ID es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID debe ser un número positivo"),
    validateResult
];

// Crear categoría
export const validateCreateCategory = [
    check("nombre")
        .notEmpty().withMessage("El nombre de la categoría es obligatorio")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ max: 50 }).withMessage("El nombre no puede superar 50 caracteres"),
    validateResult
];

// Actualizar categoría
export const validateUpdateCategory = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID debe ser un número válido"),
    check("nombre")
        .optional()
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ max: 50 }).withMessage("El nombre no puede superar 50 caracteres"),
    validateResult
];

// Eliminar categoría
export const validateDeleteCategory = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID debe ser un número válido"),
    validateResult
];
