import '../Styles/Navbar.css'
import { Link } from 'react-router-dom';
import { useModal } from '../Context/ModalContext';
import { Cart } from './Cart';

export default function Navbar() {

    const {openLogin, openRegister} = useModal();
    return (
        <nav className="section_nav">
            <ul className="nav">
                <li className="nav_item">
                    <Link to="/">🏠 Home</Link>
                </li>
                <li className="nav_item">
                    <Link to="/catalogo">📚 Catálogos</Link>
                <ul className="sub_nav">
                    <li className="sub_nav-item">
                        <Link to="/catalogo/autos">🏎️ Autos</Link>
                    </li>
                    <li className="sub_nav-item">
                        <Link to="/catalogo/motos">🛵 Motos</Link>
                    </li>
                </ul>
                </li>    
                
                {/* <li className="nav_item">
                    <button onClick={openRegister}>📝 Registrarse</button>
                    </li> */}
                <li className="nav_item">
                    <Link to="/nosotros">🫂 Nosotros</Link>
                </li>
                
                <li className="nav_item">
                    <Link to="/ayuda">❓ Ayuda</Link>
                </li>
                <li className="nav_item ">
                    <div className='item-login'>
                        <button onClick={openLogin}>🔑 Login</button>
                    </div>
                    
                </li>
        </ul>
        <Cart></Cart>
    </nav>
);
}
