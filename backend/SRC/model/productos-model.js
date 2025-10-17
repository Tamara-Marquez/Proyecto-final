import pool from "../config/bd.js"


// export const getProducts =  async () => {
//     try {
//         const query = "SELECT * FROM productos";
//         const [rows] = await pool.query (query);
//         return rows; 
//     } catch (error) {
//         console.error("Error al obtener los productos:", error);
//         throw new Error("No se pudieron obtener los productos de la base de datos");
        
//     }
// };
export const getProducts = async (search = null) => {
    try {
        let query = `
            SELECT 
                p.id_producto,
                p.marca,
                p.modelo,
                p.anio,
                p.precio,
                p.estado,
                p.descripcion,
                p.cantidad,
                p.image,
                p.id_categoria,
                c.nombre as categoria_nombre
            FROM productos p
            LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
            WHERE p.estado = 'disponible'
        `;
        
        const params = [];
        
        if (search && search.trim() !== '') {
            query += ` AND (p.marca LIKE ? OR p.modelo LIKE ?)`;
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern);
        }
        
        query += ` ORDER BY p.id_producto DESC`;
        
        const [productos] = await pool.query(query, params);
        return productos;
        
    } catch (error) {
        console.error('Error en getProducts:', error);
        throw error;
    }
};
export const getProductsById = async (id) => {
    try {
        const query = "SELECT * FROM productos WHERE id_producto = ?";
        const [rows] = await pool.query(query, [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error al obtener producto con id ${id}:`, error.message);
        throw new Error(`No se pudo obtener el producto con id ${id} en la base de datos`);
    }
};


export const createProducts = async (producto) => {
    try {
        const { marca, modelo, anio, precio, descripcion,image,  id_categoria} = producto;
        console.log("📦 Datos recibidos para insertar:", producto);
        const query = `
            INSERT INTO productos 
            (marca, modelo, anio, precio, descripcion,image, id_categoria) 
            VALUES (?, ?, ?, ?, ?, ?,?)`;
        const [result] = await pool.query(query, [
            marca, modelo, anio, precio, descripcion,image, id_categoria
        ]);
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [result.insertId]);
        return rows[0];
    } catch (error) {
        console.error("Error al crear un producto:", error.message);
        throw new Error("No se pudo crear el nuevo producto");
    }
};

export const updateProduct = async (id, producto) => {
    try {
        const { marca, modelo, anio, precio, descripcion, id_categoria } = producto;
        const query = `
            UPDATE productos 
            SET marca = ?, modelo = ?, anio = ?, precio = ?, descripcion = ?, id_categoria = ? = ?
            WHERE id_producto = ? `;
        const [result] = await pool.query(query, [
            marca, modelo, anio, precio, descripcion, id_categoria, id
        ]);
        if (result.affectedRows === 0) {
            throw new Error("Producto no encontrado");
        }
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM productos WHERE id_producto= ?", [id]);
        if (result.affectedRows === 0) {
            throw new Error("Producto no encontrado");
        }
        return { message: "Producto eliminado con éxito" };
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        throw error;
    }
};
