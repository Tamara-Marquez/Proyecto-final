import { check, param, validationResult } from "express-validator";



export const validarVenta = [
  check("id_usuario")
    .notEmpty().withMessage("El id_usuario es obligatorio")
    .isInt({ gt: 0 }).withMessage("El id_usuario debe ser un número entero positivo"),

  check("total")
    .notEmpty().withMessage("El total es obligatorio")
    .isFloat({ gt: 0 }).withMessage("El total debe ser un número decimal positivo"),

  check("productos")
    .isArray({ min: 1 }).withMessage("Debe enviar al menos un producto")
    .custom((productos) => {
      for (const p of productos) {
        if (!p.id_producto || typeof p.id_producto !== "number" || p.id_producto <= 0) {
          throw new Error("Cada producto debe tener un id_producto válido");
        }
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
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

export const validarIdUsuario = (req, res, next) => {
  const { idUsuario } = req.params;
  if (!idUsuario || isNaN(Number(idUsuario))) {
    return res.status(400).json({ msg: "ID de usuario inválido" });
  }
  next();
};