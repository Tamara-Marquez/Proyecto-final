import React from 'react';
import '../Styles/ProductCard.css'; 
import { AddToCartIcon, RemoveFromCartIcon } from '../assets/icon';
import { useCart } from '../Hooks/useCart.js'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Cards = ({ categoriaNombre, producto }) => {

    const navigate = useNavigate();

const { addToCart, removeFromCart, cart } = useCart();

const inCart = cart.some(item => item.id_producto === producto);

return (
    <div className="product-card">
    <img 
        src={producto.image}
        alt={`${producto.marca} ${producto.modelo}`} 
        className="product-image" 
    />
    <div className="product-details">
        <h3 className="product-name">{producto.modelo} {producto.marca}</h3>
        <p className="product-info">Año: <strong>{producto.anio}</strong></p>
        <p className="product-info">Vehículo: <strong>{categoriaNombre}</strong></p>
        <p className="product-info">Estado: <strong>{producto.estado}</strong></p>
        <div className="product-price">
        ${producto.precio.toLocaleString('es-AR')}
    </div>
    <div className='container-button'>
        <button className='buy-button'
            style={{ backgroundColor: inCart ? "rgba(201, 20, 20, 0.89)" : "rgba(149, 155, 157, 1)" }}
            onClick={() => inCart ? removeFromCart(producto) : addToCart(producto)}
        >
        {inCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
        </button>
        <button 
        className='buy-button'
        onClick={()=> navigate(`/productos/${producto.id_producto}`)} >
            Más información
        </button>
        </div>
    </div>
    </div>
);
};

export default Cards;

