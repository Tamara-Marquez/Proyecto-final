import { pool } from "../config/bd.js";

// ✅ Validar que el id_usuario exista
export const validateUsuario = async (req, res, next) => {
  const { id_usuario } = req.body;
  if (!id_usuario) {
    return res.status(400).json({ mensaje: "id_usuario es obligatorio" });
  }

  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
  if (rows.length === 0) {
    return res.status(404).json({ mensaje: `No existe el usuario con id ${id_usuario}` });
  }

  next();
};

// ✅ Validar que el id_producto exista y esté disponible
export const validateProducto = async (req, res, next) => {
  const { id_producto } = req.body;
  if (!id_producto) {
    return res.status(400).json({ mensaje: "id_producto es obligatorio" });
  }

  const [rows] = await pool.query(
    "SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
    [id_producto]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: `Producto no existe o ya está vendido` });
  }

  next();
};

// ✅ Validar que el total sea un número positivo
export const validateTotal = (req, res, next) => {
  const { total } = req.body;
  if (total === undefined || isNaN(total) || total <= 0) {
    return res.status(400).json({ mensaje: "total debe ser un número positivo" });
  }
  next();
};

// ✅ Validar que el id de la venta exista (para update o delete)
export const validateVentaId = async (req, res, next) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: `No se encontró la venta con id ${id}` });
  }

  next();
};
