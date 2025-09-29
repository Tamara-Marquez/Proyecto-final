import pool  from "../config/bd.js";


export const getVentas = async () => {
  const query = `
    SELECT v.id_venta, v.fecha, v.total,
          u.nombre AS cliente_nombre, u.apellido AS cliente_apellido, u.email AS cliente_email,
          p.marca, p.modelo, p.anio, p.precio AS precio_producto
    FROM ventas v
    LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
    LEFT JOIN productos p ON v.id_producto = p.id_producto
    ORDER BY v.fecha DESC
  `;
  const [rows] = await pool.query(query);
  return rows;
};


export const getVentaById = async (id) => {
  const query = `
    SELECT v.id_venta, v.fecha, v.total,
          u.nombre AS cliente_nombre, u.apellido AS cliente_apellido, u.email AS cliente_email,
          p.marca, p.modelo, p.anio, p.precio AS precio_producto
    FROM ventas v
    LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
    LEFT JOIN productos p ON v.id_producto = p.id_producto
    WHERE v.id_venta = ?
  `;
  const [rows] = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
};


export const getVentasPorCliente = async (idUsuario) => {
  const query = `
    SELECT v.id_venta, v.fecha, v.total,
          p.marca, p.modelo, p.anio
    FROM ventas v
    LEFT JOIN productos p ON v.id_producto = p.id_producto
    WHERE v.id_usuario = ?
    ORDER BY v.fecha DESC
  `;
  const [rows] = await pool.query(query, [idUsuario]);
  return rows;
};


export const getTotalDeVentas = async () => {
  const query = `SELECT SUM(total) AS total FROM ventas`;
  const [rows] = await pool.query(query);
  return rows[0]?.total || 0;
};


export const getProductoMasVendido = async () => {
  const query = `
    SELECT p.marca, p.modelo, p.anio, COUNT(*) AS veces_vendido
    FROM ventas v
    JOIN productos p ON v.id_producto = p.id_producto
    GROUP BY v.id_producto
    ORDER BY veces_vendido DESC
    LIMIT 1
  `;
  const [rows] = await pool.query(query);
  return rows.length ? rows[0] : null;
};


export const getVentasPorFecha = async (fechaInicio, fechaFin) => {
  const query = `
    SELECT v.id_venta, v.fecha, v.total,
          u.nombre AS cliente_nombre, u.apellido AS cliente_apellido,
          p.marca, p.modelo
    FROM ventas v
    LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
    LEFT JOIN productos p ON v.id_producto = p.id_producto
    WHERE v.fecha BETWEEN ? AND ?
    ORDER BY v.fecha ASC
  `;
  const [rows] = await pool.query(query, [fechaInicio, fechaFin]);
  return rows;
};


export const createVenta = async ({ id_usuario, id_producto, total }) => {
  const query = `
    INSERT INTO ventas (id_usuario, id_producto, total)
    VALUES (?, ?, ?)
  `;
  const [result] = await pool.query(query, [id_usuario, id_producto, total]);
  return { id_venta: result.insertId, id_usuario, id_producto, total };
};


export const updateVenta = async (id, { id_usuario, id_producto, total }) => {
  const query = `
    UPDATE ventas
    SET id_usuario = ?, id_producto = ?, total = ?
    WHERE id_venta = ?
  `;
  const [result] = await pool.query(query, [id_usuario, id_producto, total, id]);
  return result.affectedRows ? { id_venta: id, id_usuario, id_producto, total } : null;
};


export const deleteVenta = async (id) => {
  const query = `DELETE FROM ventas WHERE id_venta = ?`;
  const [result] = await pool.query(query, [id]);
  return result.affectedRows > 0;
};
