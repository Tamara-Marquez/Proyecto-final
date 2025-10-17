import { check, param, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateId = [
    param("id")
        .notEmpty().withMessage("El ID es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID debe ser un número positivo"),
    validateResult  
];

export const validateCreateProduct = [
    check("marca")
        .notEmpty().withMessage("La marca es obligatoria")
        .isString().withMessage("Marca debe ser texto"),
    check("modelo")
        .notEmpty().withMessage("El modelo es obligatorio")
        .isString().withMessage("Modelo debe ser texto"),
    check("anio")
        .notEmpty().withMessage("El año es obligatorio")
        .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("El año debe ser válido"),
    check("precio")
        .notEmpty().withMessage("El precio es obligatorio")
        .isFloat({ min: 1 }).withMessage("El precio debe ser mayor a 0"),
    check("descripcion")
        .optional()
        .isLength({ max: 500 }).withMessage("La descripción no puede superar 500 caracteres"),
        check("image")
        .notEmpty().withMessage("Cargar una imagen por favor")
        .isString().withMessage("La URL debe ser texto"),
    check("id_categoria")
        .notEmpty().withMessage("La categoría es obligatoria")
        .isInt().withMessage("La categoría debe ser un número"),
    check("id_usuario")
        .notEmpty().withMessage("El usuario es obligatorio")
        .isInt().withMessage("El usuario debe ser un número"),
    validateResult  
];

export const validateUpdateProduct = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID debe ser un número válido"),
    check("marca").optional().isString().withMessage("Marca debe ser texto"),
    check("modelo").optional().isString().withMessage("Modelo debe ser texto"),
    check("anio").optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("El año debe ser válido"),
    check("precio").optional().isFloat({ min: 1 }).withMessage("El precio debe ser mayor a 0"),
    check("descripcion").optional().isLength({ max: 500 }).withMessage("La descripción no puede superar 500 caracteres"),
    check("id_categoria").optional().isInt().withMessage("La categoría debe ser un número"),
    check("id_usuario").optional().isInt().withMessage("El usuario debe ser un número"),
    validateResult
];

export const validateDeleteProduct = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID debe ser un número válido"),
    validateResult
];
