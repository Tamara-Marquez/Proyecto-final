import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

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
                <b>Tarjetas de crédito y débito:</b> Aceptamos Visa, Mastercard, American Express y otras tarjetas nacionales e internacionales.
            </div>

        <div className="spec">
            <b>Transferencia bancaria:</b> Podés realizar el pago mediante transferencia o depósito directo a nuestra cuenta. Los datos se enviarán al confirmar la compra.
        </div>

        <div className="spec">
            <b>Mercado Pago:</b> Pagá de forma rápida y segura con tu cuenta de Mercado Pago, incluyendo cuotas sin interés según promociones vigentes.
        </div>

        <div className="spec">
            <b>Efectivo o retiro en tienda:</b> Si preferís, podés abonar en efectivo al retirar el producto en nuestro local (previa coordinación).
        </div>

        <div className="spec">
            <b>Financiación:</b> Ofrecemos planes en cuotas fijas con distintas tarjetas, según las promociones disponibles al momento de la compra.
        </div>
    </div>
)}
        </div>
    </div>
    <div className="btn-atras">
        <button className="btn ghost" onClick={handeClick}>
            Volver
        </button>
    </div>
    </aside>
);
};

export default DetalleProducto;
