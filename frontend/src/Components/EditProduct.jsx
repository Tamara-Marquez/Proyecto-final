import { useState } from "react";
import {updateProduct} from '../Config/fetch-products.js'
import "../Styles/DetalleProducto.css";


const EditProductForm = ({producto, onUpdated, onCancel}) => {
    const [formData, setFormData] = useState (producto);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value}= e.target;
        setFormData ({...formData, [name]: value});
    };

    const handleSubmit = async(e)=> {
        e.preventDefault();
        setLoading(true);
        try {
            const updated= await updateProduct(producto.id_producto, formData);
            onUpdated(updated.producto);
            alert("✅ Producto actualizado con éxito");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        alert("❌ Error al actualizar el producto");
        }
        finally {
            setLoading(false);
        }
    }


return (
    <form onSubmit={handleSubmit} className="edit-form">
        <h2 className="edit-product">Editar producto</h2>

        <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            placeholder="Marca"
        />
        <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Modelo"
        />
        <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
        />
        <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
        />

    <div className="cta">
        <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button className="btn ghost" type="button" onClick={onCancel}>
            Cancelar
        </button>
    </div>
    </form>
);
};

export default EditProductForm;