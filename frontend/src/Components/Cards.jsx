import React from 'react';
import '../Styles/ProductCard.css'; 
import { AddToCartIcon, RemoveFromCartIcon } from '../assets/icon';
import { useCart } from '../Hooks/useCart.js'
import { useNavigate } from 'react-router-dom';

const Cards = ({ categoriaNombre, producto }) => {

    const navigate = useNavigate();

const { id_producto, marca, modelo, anio, precio, image, estado } = producto;

const { addToCart, removeFromCart, cart } = useCart();

const inCart = cart.some(item => item.id_producto === id_producto);

return (
    <div className="product-card">
    <img 
        src={image}
        alt={`${marca} ${modelo}`} 
        className="product-image" 
    />
    <div className="product-details">
        <h3 className="product-name">{modelo} {marca}</h3>
        <p className="product-info">Año: <strong>{anio}</strong></p>
        <p className="product-info">Vehículo: <strong>{categoriaNombre}</strong></p>
        <p className="product-info">Estado: <strong>{estado}</strong></p>
        <div className="product-price">
        ${precio.toLocaleString('es-AR')}
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
        onClick={()=> navigate(`/productos/${id_producto}`)} >
            Más información
        </button>
        </div>
    </div>
    </div>
);
};

export default Cards;

