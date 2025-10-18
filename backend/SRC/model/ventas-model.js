import pool  from "../config/bd.js";


export const getVentas = async () => {
  const query = `
    SELECT v.id_venta, v.id_usuario, v.total,
      u.nombre AS nombre_usuario,
      u.email AS email,
      dv.id_producto, p.marca, p.modelo, p.anio, dv.subtotal
    FROM ventas v
    LEFT JOIN detalle_venta dv ON v.id_venta = dv.id_venta
    LEFT JOIN productos p ON dv.id_producto = p.id_producto
    LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
    ORDER BY v.id_venta DESC;
  `;
  const [rows] = await pool.query(query);
  return rows;
};


export const getVentaById = async (id) => {
  const query = `
    SELECT v.id_venta,  v.total,
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


// export const getVentasPorCliente = async (idUsuario) => {
//   const query = `
//       SELECT 
//         v.id_venta,
//         v.id_usuario,
//         v.id_producto,
//         v.total AS subtotal,
//         p.marca,
//         p.modelo,
//         p.anio
//       FROM ventas v
//       INNER JOIN productos p ON v.id_producto = p.id_producto
//       WHERE v.id_usuario = ?
//     `;
//   const [rows] = await pool.query(query, [idUsuario]);
//   return rows;
// };
export const getVentasPorCliente = async (idUsuario) => {
  const query = `
      SELECT 
        v.id_venta,
        v.id_usuario,
        v.total,
        dv.id_producto,
        dv.cantidad,
        dv.subtotal,
        p.marca,
        p.modelo,
        p.anio
      FROM ventas v
      INNER JOIN detalle_venta dv ON v.id_venta = dv.id_venta
      INNER JOIN productos p ON dv.id_producto = p.id_producto
      WHERE v.id_usuario = ?
      ORDER BY v.id_venta DESC
    `;
  const [rows] = await pool.query(query, [idUsuario]);
  return rows;
};


export const getTotalDeVentas = async () => {
  const query = "SELECT SUM(total) AS total FROM ventas";
  const [rows] = await pool.query(query);
  return rows[0]?.total || 0;
};


export const updateProductoVendido = async (id_producto) => {
  const query = `
    UPDATE productos
    SET cantidad = cantidad - 1,
        estado = CASE WHEN cantidad - 1 <= 0 THEN 'vendido' ELSE 'disponible' END
    WHERE id_producto = ?
  `;
  await pool.query(query, [id_producto]);
};




export const createVenta = async ({ id_usuario, total }) => {
  const query = `
    INSERT INTO ventas (id_usuario, total)
    VALUES (?, ?)
  `;
  const [result] = await pool.query(query, [id_usuario, total]);
  return { id_venta: result.insertId, id_usuario, total };
};

export const createDetalleVenta = async ({ id_venta, id_producto, subtotal }) => {
  const query = `
    INSERT INTO detalle_venta (id_venta, id_producto, cantidad, subtotal)
    VALUES (?, ?, 1, ?)
  `;
  const [result] = await pool.query(query, [id_venta, id_producto, subtotal]);
  return result;
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
  const query = "DELETE FROM ventas WHERE id_venta = ?";
  const [result] = await pool.query(query, [id]);
  return result.affectedRows > 0;
};