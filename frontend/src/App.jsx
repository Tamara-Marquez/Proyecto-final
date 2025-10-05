
import { Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Pages/HomePage";
import Catalogo from './Pages/Catalogo';
import Autos from './Components/Autos';
import Motos from './Components/Motos';
import DetalleProducto from "./Components/Detalles";
import { useModal, ModalProvider } from "./Context/ModalContext";

function AppContent() {
  const {showLogin, closeLogin, showRegister, closeRegister} = useModal();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/autos" element={<Autos />} />
        <Route path="/catalogo/motos" element={<Motos />} />
        <Route path="/productos/:id" element={<DetalleProducto/>} />
      </Routes>
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeLogin}> X </button>
            <Login></Login>
          </div>
        </div>
      )}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeRegister}> X </button>
            <Register></Register>
          </div>
        </div>
      )}
    </>
  );
}



export default function App () {
  return (
        <ModalProvider>
          <AppContent></AppContent>
        </ModalProvider>
  )
}
