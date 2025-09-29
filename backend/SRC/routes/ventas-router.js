import { Router } from "express";
import {getVentas, getVentaById, getVentasPorCliente, getVentasPorFecha, getTotalDeVentas, getProductoMasVendido, createVenta,updateVenta, deleteVenta} from "../controller/venta-controller.js";
import { validarFechas, validarIdVenta, validarVenta } from "../middleware/ventas-validator.js";

const router = Router();


router.get("/ventas", getVentas);
router.get("/ventas/:id", validarIdVenta,getVentaById);
router.get("/ventas/cliente/:idUsuario",validarIdVenta ,getVentasPorCliente);
router.get("/ventas/fecha/:fecha",validarFechas, getVentasPorFecha);
router.get("/ventas/total", getTotalDeVentas);
router.get("/ventas/mas-vendido", getProductoMasVendido);
router.post("/ventas", validarVenta,createVenta);
router.put("/ventas/:id",validarIdVenta, validarVenta, updateVenta);
router.delete("/ventas/:id",validarIdVenta, deleteVenta);

export default router;


