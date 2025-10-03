export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  DECREMENT_ITEM: 'DECREMENT_ITEM'
}

// guarda el carrito en el localstorage
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

// guarda las acciones que hace el state

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id_producto } = action.payload
    const productInCartIndex = state.findIndex(item => item.id_producto === id_producto)

    if (productInCartIndex >= 0) {
    
      const newState = state.map(item => {
        if (item.id_producto === id_producto) {
          return {
            ...item,
            cantidad: item.cantidad + 1
          }
        }

        return item
      })

      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload, 
        cantidad: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id_producto } = action.payload
    const newState = state.filter(item => item.id_producto !== id_producto)
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  },
    [CART_ACTION_TYPES.DECREMENT_ITEM]: (state, action) => {
    const { id_producto } = action.payload
    const newState = state.map(item => {
      if (item.id_producto === id_producto && item.cantidad > 1) {
        return {
          ...item,
          cantidad: item.cantidad - 1
        }
      }
      return item
    })
    
    updateLocalStorage(newState)
    return newState
  }


  
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}