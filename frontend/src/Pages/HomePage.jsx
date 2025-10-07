import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';
import '../Styles/Home.css';
import { API_URL } from '../Config/api';

const Home = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
        try {
            const res = await fetch(`${API_URL}/productos`);
            const data = await res.json();

            const destacados = data.filter(p => p.estado === 'disponible').slice(-6);
        setProductos(destacados);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    } finally {
        setLoading(false);
    }
    };

    fetchProductos();
}, []);

    const handleSearch = (e) => {
        e.preventDefault();
            if (searchTerm.trim()) {
        navigate(`/catalogo?search=${searchTerm}`);
    }
};

    return (
        <div className="home">
        <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
            <h1 className="hero-title">
            Encontrá tu vehículo <span className="highlight">ideal</span>
            </h1>
        <p className="hero-subtitle">
            La mejor selección de autos y motos. Calidad garantizada.
        </p>  
        <form className="search-box" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Buscá por marca, modelo..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
                🔍 Buscar
            </button>
        </form>

            <div className="hero-stats">
            <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Vehículos</span>
            </div>
            <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Garantía</span>
            </div>
            <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Atención</span>
            </div>
        </div>
        </div>
        </section>
        <section className="categories">
            <div className="container">
            <h2 className="section-title">Explorá por categoría</h2>
            <div className="category-grid">
            <div className="category-card" onClick={() => navigate('/catalogo/autos')}>
                <div className="category-icon">🏎️</div>
                <h3>Autos</h3>
                <p>Amplia variedad de modelos</p>
                <span className="category-arrow">→</span>
            </div>
            <div className="category-card" onClick={() => navigate('/catalogo/motos')}>
                <div className="category-icon">🏍️</div>
                <h3>Motos</h3>
                <p>Desde urbanas hasta deportivas</p>
                <span className="category-arrow">→</span>
            </div>
            </div>
        </div>
    </section>

        <section className="featured">
            <div className="container">
            <div className="section-header">
            <h2 className="section-title">Vehículos destacados</h2>
            <button 
                className="view-all-btn"
                onClick={() => navigate('/catalogo')}
            >
                Ver todos →
            </button>
            </div>

            {loading ? (
            <div className="loading">Cargando productos...</div>
        ) : (
            <div className="featured-grid">
                {productos.map((producto) => (
                <Cards
                    key={producto.id_producto}
                    producto={producto}
                    categoriaNombre={producto.id_categoria === 1 ? 'auto' : 'moto'}
                />
            ))}
            </div>
        )}
        </div>
    </section>

        <section className="why-us">
            <div className="container">
            <h2 className="section-title">¿Por qué elegirnos?</h2>
            <div className="features-grid">
            <div className="feature">
                <div className="feature-icon">✅</div>
                <h3>Garantía certificada</h3>
                <p>Todos nuestros vehículos cuentan con garantía y revisión mecánica completa</p>
            </div>
            <div className="feature">
                <div className="feature-icon">💳</div>
                <h3>Financiación flexible</h3>
                <p>Te ofrecemos las mejores opciones de financiación adaptadas a vos</p>
            </div>
            <div className="feature">
                <div className="feature-icon">🔧</div>
                <h3>Service postventa</h3>
                <p>Mantenimiento y repuestos originales para tu tranquilidad</p>
            </div>
            <div className="feature">
                <div className="feature-icon">🤝</div>
                <h3>Asesoramiento experto</h3>
                <p>Nuestro equipo te ayuda a encontrar el vehículo perfecto para vos</p>
            </div>
        </div>
        </div>
    </section>

        <section className="cta-section">
            <div className="cta-content">
            <h2>¿Listo para tu próximo vehículo?</h2>
            <p>Explorá nuestro catálogo completo y encontrá el vehículo de tus sueños</p>
            <div className="cta-buttons">
            <button 
                className="cta-btn primary"
                onClick={() => navigate('/catalogo')}
            >
                Ver catálogo completo
            </button>
            <button 
                className="cta-btn secondary"
                onClick={() => navigate('/ayuda')}
            >
                Contactanos
            </button>
        </div>
        </div>
    </section>
    </div>
);
};

export default Home;