import { Router } from "express";
import{obtenerVentas, obtenerVentaPorId, obtenerVentasPorCliente, obtenerTotalDeVentas, crearVenta} from "../controller/venta-controller.js"
import { validarIdVenta, validarVenta } from "../middleware/ventas-validator.js";

const router = Router();


// router.get("/ventas", obtenerVentas);
// router.get("/ventas/cliente/:idUsuario" ,obtenerVentasPorCliente);
// router.get("/ventas/:id", validarIdVenta,obtenerVentaPorId);

// router.get("/ventas/total", obtenerTotalDeVentas);
// router.post("/ventas", validarVenta,crearVenta);

router.get("/ventas/cliente/:idUsuario", obtenerVentasPorCliente);
router.get("/ventas/total", obtenerTotalDeVentas);

// Rutas genéricas después
router.get("/ventas/:id", validarIdVenta, obtenerVentaPorId);
router.get("/ventas", obtenerVentas);

// POST al final
router.post("/ventas", validarVenta, crearVenta);

export default router;
