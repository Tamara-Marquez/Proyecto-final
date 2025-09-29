import { useContext } from 'react'
import { CartContext } from '../Context/cart.jsx'

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === undefined) {
        throw new Error('useCart se debe usar dentro de un  CartProvider')
    }

    return context;
}