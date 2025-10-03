import { check, param, validationResult } from "express-validator";

// Validar creación de rol
const valCreateRole = [
    check("nombre_rol")
        .isString().withMessage("El nombre del rol debe ser texto")
        .notEmpty().withMessage("El nombre del rol es obligatorio"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Validar rol por ID
const valRoleById = [
    param("id")
        .isInt().withMessage("El ID del rol debe ser un número entero"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const isAdmin = (req, res, next) => {
    if (req.user && req.user.id_rol === 1) { 
        next();
    } else {
        return res.status(403).json({ message: "No tienes permisos de administrador" });
    }
};

export { valCreateRole, valRoleById, isAdmin };
