// ventas.controller.js
import {
    createVentaModel,
    getVentasModel,
    getVentaByIdModel,
    updateVentaModel,
    deleteVentaModel
} from "../models/ventas.model.js";

// Crear venta
export const createVenta = (req, res) => {
    createVentaModel(req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al registrar la venta" });
        }
        res.status(201).json({ message: "Venta registrada correctamente", id: result.insertId });
    });
};

// Listar todas las ventas
export const getVentas = (req, res) => {
    getVentasModel((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al obtener las ventas" });
        }
        res.json(results);
    });
};

// Obtener una venta por ID
export const getVentaById = (req, res) => {
    const { id } = req.params;

    getVentaByIdModel(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error en la consulta" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(results[0]);
    });
};

// Actualizar venta
export const updateVenta = (req, res) => {
    const { id } = req.params;

    updateVentaModel(id, req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al actualizar la venta" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json({ message: "Venta actualizada correctamente" });
    });
};
