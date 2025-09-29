
import { useReducer, createContext } from 'react'
import { cartReducer, cartInitialState } from '../Reducers/cartReduce.js'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const decrementItem = product => dispatch({
    type: 'DECREMENT_ITEM',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCart, removeFromCart, clearCart, decrementItem }
}


export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, decrementItem, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
      decrementItem
    }}
    >
      {children}
    </CartContext.Provider>
  )
}