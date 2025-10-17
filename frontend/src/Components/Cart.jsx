import '../Styles/Cart.css';
import { useId, useState, useEffect } from 'react'
import { CartIcon, ClearCartIcon } from '../assets/icon.jsx'
import { useCart } from '../Hooks/useCart.js'
import { useAuth } from '../Context/auth.jsx';
import { useModal } from '../Context/ModalContext.jsx';
import { crearVenta } from '../Config/fetch-ventas.js';
import { toast } from 'react-toastify';
import { ConfigToasty } from '../Config/Toasty.jsx';

function CartItem ({ image, precio, marca,modelo, cantidad, addToCart,  id_producto}) {
    const { decrementItem, removeFromCart,  } = useCart()
    const {isLoggedIn} = useAuth();
    const {openLogin} = useModal();

    const producto = { image, precio, marca, modelo, cantidad, id_producto };

    const handleDecrement = () => {
            if (cantidad === 1) {
                removeFromCart({ id_producto })
        }   else {
                decrementItem({ id_producto })
        }
    };

    const handleAdd = () => {
        if (isLoggedIn) {
            addToCart ({...producto, cantidad:1});
        } else {
            openLogin();
        }
    };

    

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
                    <button onClick={handleAdd}>+</button>
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
};

export function Cart () {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart, removeFromCart } = useCart()
    const [isOpen, setIsOpen] = useState(false)
    const [prevCartLength, setPrevCartLength] = useState(0)
    const { user } = useAuth();


    const totalItems = cart.reduce((total, item) => total + item.cantidad, 0)
    const totalPrice = cart.reduce((total, item) => total + (item.precio * item.cantidad), 0)



    useEffect(() => {
        if (cart.length > prevCartLength) {
            setIsOpen(true)
            const timer = setTimeout(() => {
                setIsOpen(false)
            }, 3000)
            
            return () => clearTimeout(timer)
        }
        setPrevCartLength(cart.length);
    }, [cart.length, prevCartLength]);


// const handleCompra = async (cart) => {
//     try {
//         for (const producto of cart) {
//             const ventaData = {
//             id_usuario: user.id_usuario, 
//             id_producto: producto.id_producto,
//             cantidad: producto.quantity || 1,
//             total: producto.precio * (producto.quantity || 1),
//         };

//         await crearVenta(ventaData);
//     }

//     toast.success(" Compra realizada con éxito", ConfigToasty);
//     clearCart();
// } catch (error) {
//     toast.error(" Error en la compra:", error,ConfigToasty);
//     }
// };
const handleCompra = async (cart) => {
    try {
        const productos = cart.map((producto) => ({
            id_producto: producto.id_producto,
            cantidad: producto.quantity || 1,
            subtotal: producto.precio * (producto.quantity || 1),
            }));

    const total = productos.reduce((acc, p) => acc + p.subtotal, 0);

    const ventaData = {
        id_usuario: user.id_usuario,
        productos, 
        total,
        };

    console.log("📦 Enviando venta:", ventaData);
    await crearVenta(ventaData);

    toast.success("Compra realizada con éxito", ConfigToasty);
    clearCart();
    } catch (error) {
        toast.error(" Error en la compra:", error, ConfigToasty);
    }
};



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
                                addToCart={addToCart}
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
                    <button className='end-buy' 
                        onClick={()=> handleCompra(cart)}>
                        Finalizar compra
                    </button>
                    </div>

                    </div>
                </div>
            )}
        </aside>
    </>
    )
};