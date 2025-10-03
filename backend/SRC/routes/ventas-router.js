import { Router } from "express";
import{obtenerVentas, obtenerVentaPorId, obtenerVentasPorCliente, obtenerTotalDeVentas, obtenerProductoMasVendido, crearVenta, actualizarVenta, eliminarVenta} from "../controller/venta-controller.js"
import { validarIdVenta, validarVenta } from "../middleware/ventas-validator.js";
import { isAdmin } from "../middleware/roles-validator.js";

const router = Router();


router.get("/ventas",isAdmin, obtenerVentas);
router.get("/ventas/:id",isAdmin, validarIdVenta,obtenerVentaPorId);
router.get("/ventas/cliente/:idUsuario",isAdmin,validarIdVenta ,obtenerVentasPorCliente);
router.get("/ventas/total",isAdmin, obtenerTotalDeVentas);
router.get("/ventas/mas-vendido",isAdmin, obtenerProductoMasVendido);
router.post("/ventas",isAdmin, validarVenta,crearVenta);
router.put("/ventas/:id",isAdmin,validarIdVenta, validarVenta, actualizarVenta);
router.delete("/ventas/:id",isAdmin,validarIdVenta, eliminarVenta);

export default router;


