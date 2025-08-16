// ventas.controller.js
// ventas.controller.js



const VentaModel = require('../models/ventas.model');

// --- Funciones de controlador sin lógica de validación ---

const getVentas = async (req, res) => {
  const ventas = await VentaModel.findAll();
  res.status(200).json(ventas);
};

const getVentaById = async (req, res) => {
  const { id } = req.params;
  const venta = await VentaModel.findById(id);

  if (!venta) {
    return res.status(404).json({ message: 'Venta no encontrada.' });
  }
  res.status(200).json(venta);
};

const getVentasPorCliente = async (req, res) => {
  const { clienteId } = req.params;
  const ventasDelCliente = await VentaModel.findByClienteId(clienteId);
  res.status(200).json(ventasDelCliente);
};

const getTotalDeVentas = async (req, res) => {
    const ventas = await VentaModel.findAll();
    const total = ventas.reduce((acumulador, venta) => acumulador + venta.total, 0);
    res.status(200).json({ totalVentas: total });
};

const getProductoMasVendido = async (req, res) => {
    const ventas = await VentaModel.findAll();
    const conteoProductos = {};
    ventas.forEach(venta => {
        venta.productos.forEach(producto => {
            const { productoId, cantidad } = producto;
            conteoProductos[productoId] = (conteoProductos[productoId] || 0) + cantidad;
        });
    });

    const productosOrdenados = Object.keys(conteoProductos).sort((a, b) => conteoProductos[b] - conteoProductos[a]);
    const productoMasVendido = productosOrdenados[0];

    res.status(200).json({
        productoId: productoMasVendido,
        cantidadVendida: conteoProductos[productoMasVendido]
    });
};

const getVentasPorFecha = async (req, res) => {
  const { fechaInicial, fechaFinal } = req.query;
  
  if (!fechaInicial || !fechaFinal) {
    return res.status(400).json({ message: 'Se requieren las fechas inicial y final para la búsqueda.' });
  }

  const ventas = await VentaModel.findAll();
  const ventasFiltradas = ventas.filter(venta => {
    const fechaVenta = new Date(venta.fechaVenta);
    return fechaVenta >= new Date(fechaInicial) && fechaVenta <= new Date(fechaFinal);
  });

  res.status(200).json(ventasFiltradas);
};

// --- Operaciones CRUD (Crear, Actualizar, Eliminar) ---

const createVenta = async (req, res) => {
  const nuevaVenta = await VentaModel.create(req.body);
  res.status(201).json({ message: 'Venta creada exitosamente.', venta: nuevaVenta });
};

const updateVenta = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const ventaActualizada = await VentaModel.update(id, datosActualizados);

  if (!ventaActualizada) {
    return res.status(404).json({ message: 'Venta no encontrada para actualizar.' });
  }
  res.status(200).json({ message: 'Venta actualizada exitosamente.', venta: ventaActualizada });
};

const deleteVenta = async (req, res) => {
  const { id } = req.params;
  const fueEliminada = await VentaModel.delete(id);

  if (!fueEliminada) {
    return res.status(404).json({ message: 'Venta no encontrada para eliminar.' });
  }
  res.status(200).json({ message: 'Venta eliminada exitosamente.' });
};

module.exports = {
  getVentas,
  getVentaById,
  getVentasPorCliente,
  getTotalDeVentas,
  getProductoMasVendido,
  getVentasPorFecha,
  createVenta,
  updateVenta,
  deleteVenta,
};
