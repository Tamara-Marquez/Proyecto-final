// import pool from "../config/bd.js";
// import { getVentas, getVentaById, getVentasPorCliente, getTotalDeVentas, getProductoMasVendido, createVenta, updateVenta, deleteVenta} from "../model/ventas-model.js";

// export const obtenerVentas = async (req, res) => {
//   try {
//     const ventas = await getVentas();
//     res.status(200).json(ventas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener ventas", error: error.message });
//   }
// };

// export const obtenerVentaPorId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [rows] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
//     if (rows.length === 0) return res.status(404).json({ message: `No se encontró la venta con id ${id} `});

//     const venta = await getVentaById(id);
//     res.status(200).json(venta);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener venta", error: error.message });
//   }
// };

// export const obtenerVentasPorCliente = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) return res.status(400).json({ message: "id_usuario es obligatorio" });
//     const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
//     if (usuario.length === 0) return res.status(404).json({ message:` No existe el usuario con id ${id}` });

//     const ventas = await getVentasPorCliente(id);
//     res.status(200).json(ventas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener ventas por cliente", error: error.message });
//   }
// };

// export const obtenerTotalDeVentas = async (req, res) => {
//   try {
//     const total = await getTotalDeVentas();
//     res.status(200).json({ total });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener total de ventas", error: error.message });
//   }
// };

// export const obtenerProductoMasVendido = async (req, res) => {
//   try {
//     const producto = await getProductoMasVendido();
//     res.status(200).json(producto);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener el producto más vendido", error: error.message });
//   }
// };





// export const crearVenta = async (req, res) => {
//   try {
//     const { id_usuario, id_producto, total } = req.body;

//     // Validaciones básicas
//     if (!id_usuario) return res.status(400).json({ message: "id_usuario es obligatorio" });
//     if (!id_producto) return res.status(400).json({ message: "id_producto es obligatorio" });
//     if (total === undefined || isNaN(total) || total <= 0) return res.status(400).json({ message: "total debe ser un número positivo" });

//     // Verificar que el usuario exista
//     const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
//     if (usuario.length === 0) return res.status(404).json({ message: `No existe el usuario con id ${id_usuario}` });

//     // Verificar que el producto exista y esté disponible
//     const [producto] = await pool.query("SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
//       [id_producto]
//     );

//     if (producto.length === 0) return res.status(404).json({ message: "Producto no existe o ya está vendido" });

//     const prod = producto[0];

//     // Chequear stock
//     if (prod.cantidad <= 0) {return res.status(400).json({ message: "No hay stock disponible para este producto" });
//     }

//     // Crear la venta
//     const nuevaVenta = await createVenta({ id_usuario, id_producto, total });

//     // Actualizar stock y estado del producto
//     const nuevaCantidad = prod.cantidad - 1;
//     const nuevoEstado = nuevaCantidad === 0 ? "vendido" : "disponible";

//     await pool.query("UPDATE productos SET cantidad = ?, estado = ? WHERE id_producto = ?",
//       [nuevaCantidad, nuevoEstado, id_producto]
//     );

//     // Respuesta exitosa
//     res.status(201).json({
//       message: "Venta creada exitosamente",
//       venta: nuevaVenta,
//       stock_restante: nuevaCantidad,
//       estado_actual: nuevoEstado,
//     });

//   } catch (error) {
//     console.error("Error al crear la venta:", error);
//     res.status(500).json({ message: "Error al crear la venta", error: error.message });
//   }
// };


// export const actualizarVenta = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id_usuario, id_producto, total } = req.body;

  
//     const [ventaExistente] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
//     if (ventaExistente.length === 0) return res.status(404).json({ message: `No se encontró la venta con id ${id}` });

//     if (id_usuario) {
//       const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
//       if (usuario.length === 0) return res.status(404).json({ message: `No existe el usuario con id ${id_usuario}`});
//     }

//     if (id_producto) {
//       const [producto] = await pool.query(
//         "SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
//         [id_producto]
//       );
//       if (producto.length === 0) return res.status(404).json({ message: "Producto no existe o ya está vendido" });
//     }

//     if (total !== undefined && (isNaN(total) || total <= 0)) {return res.status(400).json({ message: "Total debe ser un número positivo" });
//     }

//     const ventaActualizada = await updateVenta(id, { id_usuario, id_producto, total });
//     res.status(200).json({ message: "Venta actualizada", venta: ventaActualizada });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al actualizar la venta", error: error.message });
//   }
// };

// export const eliminarVenta = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [ventaExistente] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
//     if (ventaExistente.length === 0) return res.status(404).json({ message:` No se encontró la venta con id ${id}` });

//     await deleteVenta(id);
//     res.status(200).json({ message: "Venta eliminada correctamente" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al eliminar la venta", error: error.message });
//   }
// };
import pool from "../config/bd.js";
import { getVentas, getVentaById, getVentasPorCliente, getTotalDeVentas,updateProductoVendido,createDetalleVenta, createVenta} from "../model/ventas-model.js";

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await getVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas", error: error.message });
  }
};

export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: `No se encontró la venta con id ${id} `});

    const venta = await getVentaById(id);
    res.status(200).json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener venta", error: error.message });
  }
};

export const obtenerVentasPorCliente = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "id_usuario es obligatorio" });
    const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
    if (usuario.length === 0) return res.status(404).json({ message:` No existe el usuario con id ${id}` });

    const ventas = await getVentasPorCliente(id);
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas por cliente", error: error.message });
  }
};

export const obtenerTotalDeVentas = async (req, res) => {
  try {
    const total = await getTotalDeVentas();
    res.status(200).json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener total de ventas", error: error.message });
  }
};

export const crearVenta = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id_usuario, productos, total } = req.body;

    await connection.beginTransaction();

    // Crear venta principal
    const venta = await createVenta({ id_usuario, total });
    const id_venta = venta.id_venta;

    for (const { id_producto } of productos) {
      // Verificar que el producto esté disponible
      const [producto] = await connection.query(
        "SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
        [id_producto]
      );
      if (producto.length === 0) {
        await connection.rollback();
        return res
          .status(404)
          .json({ message: `El producto ${id_producto} no está disponible` });
      }

      const precio = producto[0].precio;

      // Insertar detalle
      await createDetalleVenta({ id_venta, id_producto, subtotal: precio });

      // Actualizar producto
      await updateProductoVendido(id_producto);
    }

    await connection.commit();
    connection.release();

    res.status(201).json({
      message: "Venta creada exitosamente",
      id_venta,
      total,
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Error al crear la venta:", error);
    res.status(500).json({ message: "Error al crear la venta", error: error.message });
  }
};



// export const actualizarVenta = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id_usuario, id_producto, total } = req.body;

  
//     const [ventaExistente] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
//     if (ventaExistente.length === 0) return res.status(404).json({ message: `No se encontró la venta con id ${id}` });

//     if (id_usuario) {
//       const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
//       if (usuario.length === 0) return res.status(404).json({ message: `No existe el usuario con id ${id_usuario}`});
//     }

//     if (id_producto) {
//       const [producto] = await pool.query(
//         "SELECT * FROM productos WHERE id_producto = ? AND estado = 'disponible'",
//         [id_producto]
//       );
//       if (producto.length === 0) return res.status(404).json({ message: "Producto no existe o ya está vendido" });
//     }

//     if (total !== undefined && (isNaN(total) || total <= 0)) {return res.status(400).json({ message: "Total debe ser un número positivo" });
//     }

//     const ventaActualizada = await updateVenta(id, { id_usuario, id_producto, total });
//     res.status(200).json({ message: "Venta actualizada", venta: ventaActualizada });

//   } catch(error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al actualizar la venta", error: error.message });
//   }
// };

// export const eliminarVenta = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [ventaExistente] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [id]);
//     if (ventaExistente.length === 0) return res.status(404).json({ message:` No se encontró la venta con id ${id}` });

//     await deleteVenta(id);
//     res.status(200).json({ message: "Venta eliminada correctamente" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al eliminar la venta", error: error.message });
//   }
// };
