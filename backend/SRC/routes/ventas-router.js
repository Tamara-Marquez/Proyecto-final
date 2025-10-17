import { Router } from "express";
import{obtenerVentas, obtenerVentaPorId, obtenerVentasPorCliente, obtenerTotalDeVentas, obtenerProductoMasVendido, crearVenta, actualizarVenta, eliminarVenta} from "../controller/venta-controller.js"
import { validarIdVenta, validarVenta } from "../middleware/ventas-validator.js";

const router = Router();


router.get("/ventas", obtenerVentas);
router.get("/ventas/:id", validarIdVenta,obtenerVentaPorId);
router.get("/ventas/cliente/:idUsuario",validarIdVenta ,obtenerVentasPorCliente);
router.get("/ventas/total", obtenerTotalDeVentas);
router.get("/ventas/mas-vendido", obtenerProductoMasVendido);
router.post("/ventas", validarVenta,crearVenta);
router.put("/ventas/:id",validarIdVenta, validarVenta, actualizarVenta);
router.delete("/ventas/:id",validarIdVenta, eliminarVenta);

export default router;


