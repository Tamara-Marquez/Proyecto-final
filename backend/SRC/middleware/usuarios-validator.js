import { check, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const valCreateUser= [
    check("nombre")
    .isString().withMessage("El nombre debe ser texto, no incluir caracteres")
    .notEmpty().withMessage("El nombre es un campo obligatorio"), 

    check("apellido")
    .isString().withMessage("El apellido debe ser texto, no incluir caracteres")
    .notEmpty().withMessage("El apellido es un campo obligatorio"),
    
    check("email")
    .isEmail().withMessage("El email debe ser un correo electronico válido")
    .notEmpty().withMessage("El email es un campo obligatorio"),
    
    check("password")
    .isString().withMessage("El password debe ser texto")
    .notEmpty().withMessage("El password es un campo obligatorio"),

    check("id_rol")
    .isInt().withMessage("El ID debe es un número entero")
    .notEmpty().withMessage("El ID del rol es un campo requerido"),
    (req, res, next) => {
        const errors= validationResult (req);
        if (!errors.isEmpty()) {
            return res.status (400).json({errors: errors.array()})
        }
        next();
    },
];


const valUserById= [
    param ("id")
    .isInt().withMessage("El ID del usuario debe ser un número entero"),
    (req, res, next)=> {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json ({ errors : errors.array()});
        }
        next();
    }
];


const valUpdataUser = [
    param("id").isInt().withMessage("El ID del usuario debe ser un número entero"),
     check("nombre")
    .isString().withMessage("El nombre debe ser texto, no incluir caracteres")
    .notEmpty().withMessage("El nombre es un campo obligatorio"), 

    check("apellido")
    .isString().withMessage("El apellido debe ser texto, no incluir caracteres")
    .notEmpty().withMessage("El apellido es un campo obligatorio"),
    
    check("email")
    .isEmail().withMessage("El email debe ser un correo electronico válido")
    .notEmpty().withMessage("El email es un campo obligatorio"),
    
    check("password")
    .isString().withMessage("El password debe ser texto")
    .notEmpty().withMessage("El password es un campo obligatorio"),

    check("id_rol")
    .isInt().withMessage("El ID debe es un número entero")
    .notEmpty().withMessage("El ID del rol es un campo requerido"),
    (req, res, next) => {
        const errors= validationResult (req);
        if (!errors.isEmpty()) {
            return res.status (400).json({errors: errors.array()})
        }
        next();
    },
];

const isAutenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 
    if (!authHeader) {
        return res.status(403).json({ message: "No tienes token de autorización." });
}
    try {
    const token = authHeader.split(" ")[1];

    const secretKey = process.env.SECRET_KEY;
    const verified = jwt.verify(token, secretKey);
    req.user = verified; 
    next();
} catch (error) {
    res.status(403).json({ message: "Token inválido o expirado.", error: error.message });
}
};

export { valCreateUser, valUserById, valUpdataUser, isAutenticated};