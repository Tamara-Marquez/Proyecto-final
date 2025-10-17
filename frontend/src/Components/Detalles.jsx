import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../Hooks/useCart.js';
import "../Styles/DetalleProducto.css";
import { API_URL } from "../Config/api.js";
import { useAuth } from '../Context/auth';
import EditProducts from '../Components/EditProduct.jsx'
import { deleteProduct } from "../Config/fetch-products.js";
import { toast } from 'react-toastify';
import { ConfigToasty } from '../Config/Toasty.jsx';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("desc");
    const [editMode, setEditMode] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handeClick = () => {
        navigate(-1);
    }

useEffect(() => {
    const fetchProducto = async () => {
        try {
            const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error("Error al obtener el producto");
            const data = await res.json();
        setProducto(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

    fetchProducto();
}, [id]);

const handleDelete= async () =>{
    if (!user || user.id_rol !== 1) {
        toast.error(" No tienes permisos para eliminar productos", ConfigToasty);
        return;
    }
    if (window.confirm("¿Estás seguro de eliminar este producto?")){
        
        try {
            await deleteProduct(producto.id_producto);
            toast.success("🗑️ Producto eliminado correctamente", ConfigToasty);
            navigate("/")
        } catch (error) {
            if (error.response?.status === 403) {
            toast.error(" No tienes permisos para eliminar este producto",ConfigToasty);
        } else {
            toast.error("Error al eliminar el producto", ConfigToasty);
        }
            console.error (error);
        }
    }
}

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!producto) return <p>Producto no encontrado.</p>;



return (
    <aside className="card details">
        {!editMode ? (
        <>
            <div className="img-datails">
                <img
                    src={producto.image}
                    alt={`${producto.marca} ${producto.modelo}`}
                    className="product-image"
            />
            </div>

        <h1 className="title">
            {producto.marca} {producto.modelo} - {producto.anio}
        </h1>

        <div className="price">
            <div className="main">${producto.precio.toLocaleString("es-AR")}</div>
            <span className="badge">Precio final</span>
        </div>

        <div className="status">✔ {producto.estado}</div>

        <div className="specs">
            <div className="spec"><b>Año</b> {producto.anio}</div>
            <div className="spec"><b>Combustible</b> Nafta</div>
        </div>
<div className="cta">
    {user?.id_rol === 1 ? (
        <>
            <button className="btn ghost" onClick={() => setEditMode(true)}>
                ✏️ Editar producto
            </button>
            <button className="btn ghost" onClick={handleDelete}>
                🗑️ Eliminar
            </button>
        </>
    ) : (
        <button className="btn primary" onClick={() => addToCart(producto)}>
            Agregar al carrito
        </button>
    )}
</div>

        <div className="tabs">
            <div className="tab-nav">
                <button
                    className={activeTab === "desc" ? "active" : ""}
                    onClick={() => setActiveTab("desc")}
                >
                Descripción
                </button>
                <button
                    className={activeTab === "spec" ? "active" : ""}
                    onClick={() => setActiveTab("spec")}
                >
                Métodos de pago
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "desc" && (
                    <div className="tab-panel">
                        <p>{producto.descripcion || "Sin descripción disponible."}</p>
                    </div>
                )}

                {activeTab === "spec" && (
                    <div className="tab-panel">
                    <div className="spec">
                        <b>Tarjetas de crédito y débito:</b> Visa, Mastercard, Amex.
                    </div>
                    <div className="spec">
                        <b>Transferencia bancaria:</b> Envío de datos al confirmar compra.
                    </div>
                    <div className="spec">
                        <b>Mercado Pago:</b> Pagos rápidos con cuotas sin interés.
                    </div>
                    <div className="spec">
                        <b>Efectivo o retiro en tienda:</b> Pago directo en local.
                    </div>
                    <div className="spec">
                        <b>Financiación:</b> Cuotas fijas según promociones.
                    </div>
                    </div>
                )}
            </div>
        </div>

            <div className="btn-atras">
                <button className="btn ghost" onClick={handeClick}>Volver</button>
            </div>
        </>
    ) : (
        <EditProducts
            producto={producto}
            onUpdated={(updatedData) => {
            setProducto({ ...producto, ...updatedData });
            setEditMode(false);
        }}
            onCancel={() => setEditMode(false)}
        />
    )}
    </aside>
);
};

export default DetalleProducto;
