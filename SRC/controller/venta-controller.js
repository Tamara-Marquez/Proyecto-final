import {
  getVentas,
  getVentaById,
  getVentasPorCliente,
  getTotalDeVentas,
  getProductoMasVendido,
  getVentasPorFecha,
  createVenta,
  updateVenta,
  deleteVenta
} from "../model/ventas-model.js";

// 📌 Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await getVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ventas", error: error.message });
  }
};

// 📌 Obtener venta por ID
export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await getVentaById(id);

    if (!venta) {
      return res.status(404).json({ mensaje: `No se encontró la venta con id ${id}` });
    }

    res.status(200).json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener venta", error: error.message });
  }
};

// 📌 Ventas por cliente
export const obtenerVentasPorCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const ventas = await getVentasPorCliente(id);
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ventas por cliente", error: error.message });
  }
};

// 📌 Total de ventas
export const obtenerTotalDeVentas = async (req, res) => {
  try {
    const total = await getTotalDeVentas();
    res.status(200).json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener total de ventas", error: error.message });
  }
};

// 📌 Producto más vendido
export const obtenerProductoMasVendido = async (req, res) => {
  try {
    const producto = await getProductoMasVendido();
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el producto más vendido", error: error.message });
  }
};

// 📌 Ventas por fecha
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

// 📌 Crear venta
export const crearVenta = async (req, res) => {
  try {
    const nuevaVenta = await createVenta(req.body);
    res.status(201).json({ mensaje: "Venta creada exitosamente", venta: nuevaVenta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la venta", error: error.message });
  }
};

// 📌 Actualizar venta
export const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const ventaActualizada = await updateVenta(id, req.body);

    res.status(200).json({ mensaje: "Venta actualizada", venta: ventaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la venta", error: error.message });
  }
};

// 📌 Eliminar venta
export const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteVenta(id);
    res.status(200).json({ mensaje: "Venta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la venta", error: error.message });
  }
};
