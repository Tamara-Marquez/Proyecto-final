import '../Styles/Cart.css';
import { useId, useState, useEffect } from 'react'
import { CartIcon, ClearCartIcon } from '../assets/icon.jsx'
import { useCart } from '../Hooks/useCart.js'

function CartItem ({ image, precio, marca,modelo, cantidad, addToCart,  id_producto }) {
    const { decrementItem, removeFromCart,  } = useCart()
        const handleDecrement = () => {
            if (cantidad === 1) {
                removeFromCart({ id_producto })
        }   else {
                decrementItem({ id_producto })
        }
    }

    return (
    <li>
        <img
            src={image}
            alt={marca}
        />
    <div>
        <strong>{marca}</strong> <strong>{modelo}</strong>- ${precio}
    </div>

    <footer>
                <div className="quantity-controls">
                    <button onClick={handleDecrement}>-</button>
                    <small className='quantity'>Cantidad: {cantidad}</small>
                    <button onClick={addToCart}>+</button>
                </div>
                <small className="subtotal">
                    Subtotal: ${(precio * cantidad).toLocaleString('es-AR')}
                </small>
                <button onClick={() => removeFromCart({ id_producto })}>
                    <ClearCartIcon />
                </button>
    </footer>
    </li>
)
}

export function Cart () {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart, removeFromCart } = useCart()
    const [isOpen, setIsOpen] = useState(false)
    const [prevCartLength, setPrevCartLength] = useState(0)

    const totalItems = cart.reduce((total, item) => total + item.cantidad, 0)
    const totalPrice = cart.reduce((total, item) => total + (item.precio * item.cantidad), 0)


    // Efecto para abrir el carrito automáticamente cuando se agrega un producto
    useEffect(() => {
        if (cart.length > prevCartLength) {
            // Se agregó un producto, abrir el carrito
            setIsOpen(true)
            
            // Opcional: cerrar automáticamente después de 3 segundos
            const timer = setTimeout(() => {
                setIsOpen(false)
            }, 3000)
            
            return () => clearTimeout(timer)
        }
        setPrevCartLength(cart.length)
    }, [cart.length, prevCartLength])


    return (
    <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
        {totalItems > 0 && (
            <span className="cart-counter">{totalItems}</span>
        )}
        </label>
    <input 
        id={cartCheckboxId} 
        type='checkbox'
        checked={isOpen} 
        onChange={(e) => setIsOpen(e.target.checked)}
        hidden />

    <aside className='cart'>
            <ul>
                {cart.length === 0 ? (
                    <li className="empty-cart">El carrito está vacío</li>
                ) : (
                    cart.map(producto => (
                        <CartItem
                            key={producto.id_producto}
                                addToCart={() => addToCart(producto)}
                                removeFromCart={removeFromCart} 
                                {...producto}
                        />
                    ))
                )}
            </ul>
            
            {cart.length > 0 && (
                <div className="cart-footer">
                    <div className="cart-total">
                        Total: ${totalPrice.toLocaleString('es-AR')}
                    </div >
                    <div  className="quantity-controls">
                    <button onClick={clearCart}>
                        <ClearCartIcon />
                    </button>
                    <div>
                    <button className='end-buy' >
                        Finalizar compra
                    </button>
                    </div>

                    </div>
                </div>
            )}
        </aside>
    </>
    )
}