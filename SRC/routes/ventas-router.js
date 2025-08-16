// src/routes/ventas.routes.js

const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');
const { ventasSchema, validate } = require('../validators/ventas.validator');

// Rutas de lectura (no necesitan validación del cuerpo de la solicitud)
router.get('/', ventasController.getVentas);
router.get('/:id', ventasController.getVentaById);
router.get('/reportes/por-cliente/:clienteId', ventasController.getVentasPorCliente);
router.get('/reportes/total', ventasController.getTotalDeVentas);
router.get('/reportes/producto-mas-vendido', ventasController.getProductoMasVendido);
router.get('/reportes/por-fecha', ventasController.getVentasPorFecha);

// Rutas de creación y actualización (necesitan validación)
// Aquí se inserta el middleware 'validate(ventasSchema)'
router.post('/', validate(ventasSchema), ventasController.createVenta);
router.put('/:id', validate(ventasSchema), ventasController.updateVenta);

// Ruta de eliminación (no necesita validación del cuerpo de la solicitud)
router.delete('/:id', ventasController.deleteVenta);

module.exports = router;



