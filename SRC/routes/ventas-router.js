import { Router } from "express";
import {
  getVentas,
  getVentaById,
  getVentasPorCliente,
  getVentasPorFecha,
  getTotalDeVentas,
  getProductoMasVendido,
  createVenta,
  updateVenta,
  deleteVenta
} from "../controller/ventas-controller.js";

const router = Router();

// Rutas GET
router.get("/", getVentas);
router.get("/:id", getVentaById);
router.get("/cliente/:idUsuario", getVentasPorCliente);
router.get("/fecha/:fecha", getVentasPorFecha);
router.get("/total", getTotalDeVentas);
router.get("/mas-vendido", getProductoMasVendido);

// Rutas POST, PUT, DELETE
router.post("/", createVenta);
router.put("/:id", updateVenta);
router.delete("/:id", deleteVenta);

export default router;


