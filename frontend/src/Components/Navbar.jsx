import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../Context/ModalContext';
import { Cart } from './Cart';
import '../Styles/Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const { openLogin, openRegister } = useModal();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsCatalogOpen(false);
    };

    const toggleCatalog = (e) => {
        e.preventDefault();
        setIsCatalogOpen(!isCatalogOpen);
    };

    return (
        <nav className="section_nav">
            {/* Logo */}
            <div className="nav-logo">
                <Link to="/" onClick={closeMenu}>
                    <span>VIP Concesionaria</span>
                </Link>
            </div>

            {/* Hamburger navbaar boton */}
            <button 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Overlay para cerrar el menú en mobile */}
            {isMenuOpen && (
                <div className="nav-overlay" onClick={closeMenu}></div>
            )}

            {/* Menu */}
            <ul className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <li className="nav_item">
                    <Link to="/" onClick={closeMenu}>
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </Link>
                </li>

                <li className="nav_item has-submenu">
                    <Link 
                        to="/catalogo" 
                        onClick={(e) => {
                            if (window.innerWidth <= 768) {
                                toggleCatalog(e);
                            } else {
                                closeMenu();
                            }
                        }}
                    >
                        <span className="nav-icon">📚</span>
                        <span>Catálogos</span>
                        <span className="arrow">▼</span>
                    </Link>
                    
                    <ul className={`sub_nav ${isCatalogOpen ? 'active' : ''}`}>
                        <li className="sub_nav-item">
                            <Link to="/catalogo/autos" onClick={closeMenu}>
                                <span className="nav-icon">🏎️</span>
                                <span>Autos</span>
                            </Link>
                        </li>
                        <li className="sub_nav-item">
                            <Link to="/catalogo/motos" onClick={closeMenu}>
                                <span className="nav-icon">🛵</span>
                                <span>Motos</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav_item">
                    <Link to="/nosotros" onClick={closeMenu}>
                        <span className="nav-icon">🫂</span>
                        <span>Nosotros</span>
                    </Link>
                </li>

                <li className="nav_item">
                    <Link to="/contacto" onClick={closeMenu}>
                        <span className="nav-icon">📞</span>
                        <span>Contacto</span>
                    </Link>
                </li>

                <li className="nav_item nav_item-login">
                    <button 
                        onClick={() => {
                            openLogin();
                            closeMenu();
                        }}
                    >
                        <span className="nav-icon">🔑</span>
                        <span>Login</span>
                    </button>
                </li>
            </ul>
            <Cart />
        </nav>
    );
}