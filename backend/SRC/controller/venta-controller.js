import pool from "../config/bd.js";
import { getVentas, getVentaById, getVentasPorCliente, getTotalDeVentas, getProductoMasVendido, getVentasPorFecha, createVenta, updateVenta, deleteVenta} from "../model/ventas-model.js";

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await getVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ventas", error: error.message });
  }
};

export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: `No se encontró la venta con id ${id}` });

    const venta = await getVentaById(id);
    res.status(200).json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener venta", error: error.message });
  }
};

export const obtenerVentasPorCliente = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ mensaje: "id_usuario es obligatorio" });
    const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
    if (usuario.length === 0) return res.status(404).json({ mensaje: `No existe el usuario con id ${id}` });

    const ventas = await getVentasPorCliente(id);
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ventas por cliente", error: error.message });
  }
};

export const obtenerTotalDeVentas = async (req, res) => {
  try {
    const total = await getTotalDeVentas();
    res.status(200).json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener total de ventas", error: error.message });
  }
};

export const obtenerProductoMasVendido = async (req, res) => {
  try {
    const producto = await getProductoMasVendido();
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el producto más vendido", error: error.message });
  }
};

export const obtenerVentasPorFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const ventas = await getVentasPorFecha(fechaInicio, fechaFin);
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ventas por fecha", error: error.message });
  }
};

export const crearVenta = async (req, res) => {
  try {
    const { id_usuario, id_producto, total } = req.body;

    if (!id_usuario) return res.status(400).json({ mensaje: "id_usuario es obligatorio" });
    if (!id_producto) return res.status(400).json({ mensaje: "id_producto es obligatorio" });
    if (total === undefined || isNaN(total) || total <= 0) return res.status(400).json({ mensaje: "total debe ser un número positivo" });

    const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
    if (usuario.length === 0) return res.status(404).json({ mensaje: `No existe el usuario con id ${id_usuario}` });

    const [producto] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
      [id_producto]
    );
    if (producto.length === 0) return res.status(404).json({ mensaje: `Producto no existe o ya está vendido` });

    const nuevaVenta = await createVenta({ id_usuario, id_producto, total });
    res.status(201).json({ mensaje: "Venta creada exitosamente", venta: nuevaVenta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la venta", error: error.message });
  }
};

export const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, id_producto, total } = req.body;

  
    const [ventaExistente] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
    if (ventaExistente.length === 0) return res.status(404).json({ mensaje: `No se encontró la venta con id ${id}` });

   
    if (id_usuario) {
      const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
      if (usuario.length === 0) return res.status(404).json({ mensaje: `No existe el usuario con id ${id_usuario}` });
    }

    if (id_producto) {
      const [producto] = await pool.query(
        "SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
        [id_producto]
      );
      if (producto.length === 0) return res.status(404).json({ mensaje: `Producto no existe o ya está vendido` });
    }

    if (total !== undefined && (isNaN(total) || total <= 0)) {
      return res.status(400).json({ mensaje: "total debe ser un número positivo" });
    }

    const ventaActualizada = await updateVenta(id, { id_usuario, id_producto, total });
    res.status(200).json({ mensaje: "Venta actualizada", venta: ventaActualizada });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la venta", error: error.message });
  }
};

export const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const [ventaExistente] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
    if (ventaExistente.length === 0) return res.status(404).json({ mensaje: `No se encontró la venta con id ${id}` });

    await deleteVenta(id);
    res.status(200).json({ mensaje: "Venta eliminada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la venta", error: error.message });
  }
};
