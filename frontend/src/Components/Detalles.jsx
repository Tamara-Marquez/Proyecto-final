import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from '../Hooks/useCart.js';
import "../Styles/DetalleProducto.css";
import { API_URL } from "../Config/api.js";

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("desc");
    const { addToCart } = useCart();


useEffect(() => {
    const fetchProducto = async () => {
        try {
            const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error("Error al obtener el producto");
            const data = await res.json();
        setProducto(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    fetchProducto();
}, [id]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!producto) return <p>Producto no encontrado.</p>;

    return (
        <aside className="card details">
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
        <div className="spec"><b>Combustible : <strong>Nafta</strong></b></div>
        </div>

        <div className="cta">
            <button className="btn primary" onClick={() => addToCart(producto)} >Agregar al carrito</button>
            <button className="btn ghost">Comparar</button>
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
            Especificaciones
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
                <div className="spec"><b>Color</b> {producto.color || "N/A"}</div>
                <div className="spec"><b>Potencia</b> {producto.potencia || "N/A"}</div>
            </div>
        )}
        </div>
    </div>
    </aside>
);
};

export default DetalleProducto;
