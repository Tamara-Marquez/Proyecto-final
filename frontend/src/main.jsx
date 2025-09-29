import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './Context/ModalContext';
import { CartProvider } from './Context/cart.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <CartProvider>
        <ModalProvider>       
          <BrowserRouter>
    <App />
    </BrowserRouter>

    </ModalProvider>
    </CartProvider>
  </StrictMode>,
)
