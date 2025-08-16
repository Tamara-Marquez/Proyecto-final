 //* ventas.routes.js


const { v4: uuidv4 } = require('uuid');

// Simulación de la base de datos
let ventasDB = [];

// Funciones de controlador
const getVentas = (req, res) => {
  res.status(200).json(ventasDB);
};

const getVentaById = (req, res) => {
  const { id } = req.params;
  const venta = ventasDB.find(v => v.id === id);

  if (!venta) {
    return res.status(404).json({ message: 'Venta no encontrada.' });
  }

  res.status(200).json(venta);
};

// Nueva función: Obtener ventas por cliente
const getVentasPorCliente = (req, res) => {
  const { clienteId } = req.params;
  const ventasDelCliente = ventasDB.filter(v => v.clienteId === clienteId);
  res.status(200).json(ventasDelCliente);
};

// Nueva función: Obtener el total de ventas
const getTotalDeVentas = (req, res) => {
  const total = ventasDB.reduce((acumulador, venta) => acumulador + venta.total, 0);
  res.status(200).json({ totalVentas: total });
};

// Nueva función: Obtener el producto más vendido
const getProductoMasVendido = (req, res) => {
  const conteoProductos = {};
  ventasDB.forEach(venta => {
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

// Nueva función: Obtener ventas por rango de fechas
const getVentasPorFecha = (req, res) => {
  const { fechaInicial, fechaFinal } = req.query; // Usa req.query para parámetros opcionales
  
  if (!fechaInicial || !fechaFinal) {
    return res.status(400).json({ message: 'Se requieren las fechas inicial y final para la búsqueda.' });
  }

  const ventasFiltradas = ventasDB.filter(venta => {
    const fechaVenta = new Date(venta.fechaVenta);
    return fechaVenta >= new Date(fechaInicial) && fechaVenta <= new Date(fechaFinal);
  });

  res.status(200).json(ventasFiltradas);
};

// Mantenemos las funciones existentes para CRUD
const createVenta = (req, res) => {
  const nuevaVenta = req.body;
  nuevaVenta.id = uuidv4();
  ventasDB.push(nuevaVenta);
  res.status(201).json({ message: 'Venta creada exitosamente.', venta: nuevaVenta });
};

const updateVenta = (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const index = ventasDB.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Venta no encontrada para actualizar.' });
  }

  ventasDB[index] = { ...ventasDB[index], ...datosActualizados, id };
  res.status(200).json({ message: 'Venta actualizada exitosamente.', venta: ventasDB[index] });
};

const deleteVenta = (req, res) => {
  const { id } = req.params;
  const index = ventasDB.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Venta no encontrada para eliminar.' });
  }

  ventasDB.splice(index, 1);
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
