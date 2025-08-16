import {pool} from "../config/bd.js"
// Crear venta
export const createVentaModel = (ventaData, callback) => {
    const { fecha, total, cliente_id } = ventaData;
    const query = `
        INSERT INTO ventas (fecha, total, cliente_id)
        VALUES (?, ?, ?)
    `;
    connection.query(query, [fecha, total, cliente_id], callback);
};

// Obtener todas las ventas
export const getVentasModel = (callback) => {
    const query = `
        SELECT v.*, c.nombre AS cliente_nombre
        FROM ventas v
        JOIN clientes c ON v.cliente_id = c.id
    `;
    connection.query(query, callback);
};

// Obtener venta por ID
export const getVentaByIdModel = (id, callback) => {
    const query = `
        SELECT v.*, c.nombre AS cliente_nombre
        FROM ventas v
        JOIN clientes c ON v.cliente_id = c.id
        WHERE v.id = ?
    `;
    connection.query(query, [id], callback);
};

// Actualizar venta
export const updateVentaModel = (id, ventaData, callback) => {
    const { fecha, total, cliente_id } = ventaData;
    const query = `
        UPDATE ventas
        SET fecha = ?, total = ?, cliente_id = ?
        WHERE id = ?
    `;
    connection.query(query, [fecha, total, cliente_id, id], callback);
};

// Eliminar venta
export const deleteVentaModel = (id, callback) => {
    const query = "DELETE FROM ventas WHERE id = ?";
    connection.query(query, [id], callback);
};
