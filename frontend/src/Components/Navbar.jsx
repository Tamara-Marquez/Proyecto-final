import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../Context/ModalContext';
import { Cart } from './Cart';
import { useAuth } from '../Context/auth';
import '../Styles/Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false); 
    const { openLogin } = useModal();
    const { user, isLoggedIn, logout }= useAuth(); 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsCatalogOpen(false);
        setIsProfileOpen(false);
    };

    const toggleCatalog = (e) => {
        e.preventDefault();
        setIsCatalogOpen(!isCatalogOpen);
    };

    const toggleProfile = (e) => {
        e.preventDefault();
        setIsProfileOpen(!isProfileOpen);
    };

return (
    <nav className="section_nav">
        <div className="nav-logo">
            <Link to="/" onClick={closeMenu}>
                <span>VIP Concesionaria</span>
            </Link>
        </div>

        <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            >
            <span></span>
            <span></span>
            <span></span>
            </button>

        {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
        <ul className={`nav ${isMenuOpen ? "active" : ""}`}>
            <li className="nav_item">
                <Link to="/" onClick={closeMenu}>🏠 Home</Link>
            </li>
            <li className="nav_item has-submenu">
                <Link
                    to="/catalogo"
                    onClick={(e) =>
                        window.innerWidth <= 768 ? toggleCatalog(e) : closeMenu()
                }
                > 
                    📚 Catálogos ▼
                </Link>
                    <ul className={`sub_nav ${isCatalogOpen ? "active" : ""}`}>
                        <li>
                            <Link to="/catalogo/autos" onClick={closeMenu}>🏎️ Autos</Link>
                        </li>
                        <li>
                            <Link to="/catalogo/motos" onClick={closeMenu}>🛵 Motos</Link>
                        </li>
                    </ul>
                </li>

                <li className="nav_item">
                    <Link to="/nosotros" onClick={closeMenu}>🫂 Nosotros</Link>
                </li>

                <li className="nav_item">
                    <Link to="/contacto" onClick={closeMenu}>📞 Contacto</Link>
                </li>

                <li className="nav_item nav_item-login">
                    {!isLoggedIn ? (
                    <button
                    onClick={() => {
                    openLogin();
                    closeMenu();
            }}
            >
                🔑 Login
            </button>
        ) : (
            <>
                <button onClick={toggleProfile}>
                    {user?.id_rol === 1 ? "Administrador" : "Usuario"} ▼
                </button>

            <ul className={`sub_nav ${isProfileOpen ? "active" : ""}`}>
                {user?.id_rol === 1 && (
                <>
                    <li>
                        <Link to="/admin/administrar" onClick={closeMenu}>
                            ⚙️ Administrar
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/ventas" onClick={closeMenu}>
                            💰 Ventas
                        </Link>
                    </li>
                </>
                )}
                {user?.id_rol === 2 && (
                <>
                    <li>
                        <Link to="/perfil" onClick={closeMenu}>
                            👤 Mi Perfil
                    </Link>
                    </li>
                    <li>
                        <Link to="/mis-compras" onClick={closeMenu}>
                            🛒 Mis Compras
                    </Link>
                    </li>
                </>
                )}
                <li>
                <button
                    onClick={() => {
                        logout();
                        closeMenu();
                    }}
                >
                    🚪 Cerrar sesión
                </button>
                </li>
            </ul>
            </>
        )}
        </li>
            </ul>

            <Cart />
        </nav>
    );
};