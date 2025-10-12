import { Outlet, useSearchParams} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Cards from '../Components/Cards';
import '../Styles/ProductCard.css';
import Filtros from '../Components/Filter.jsx'
import { API_URL } from "../Config/api.js";


const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const searchTerm = searchParams.get('search'); 
  
  const [todosProductos, setTodosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setTodosProductos(data);
        setProductosFiltrados(data); // Inicialmente mostrar todos
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Aplicar búsqueda cuando cambia searchTerm
  useEffect(() => {
    let filtered = [...todosProductos];

    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(producto => 
        producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProductosFiltrados(filtered);
  }, [searchTerm, todosProductos]);

  // Función para manejar filtros
  const handleFiltrar = useCallback(({ marca, anio }) => {
    let filtered = [...todosProductos];

    // Aplicar búsqueda primero
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(producto => 
        producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros
    if (marca) {
      filtered = filtered.filter(p => p.marca === marca);
    }

    if (anio) {
      filtered = filtered.filter(p => p.anio === parseInt(anio));
    }

    setProductosFiltrados(filtered);
  }, [todosProductos, searchTerm]);

  // Limpiar búsqueda
  const limpiarBusqueda = () => {
    setSearchParams({});
  };

  // Agrupar productos filtrados por categoría
  const productosPorCategoria = productosFiltrados.reduce((acc, producto) => {
    const catId = producto.id_categoria || "sin_categoria";
    if (!acc[catId]) {
      acc[catId] = {
        id_categoria: catId,
        nombre: producto.categoria_nombre || "Sin categoría",
        productos: []
      };
    }
    acc[catId].productos.push(producto);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="catalogo">
        <p style={{ textAlign: 'center', padding: '60px' }}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogo">
        <p style={{ color: "red", textAlign: 'center', padding: '60px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="catalogo">
      {searchTerm ? (
        <div className="search-header">
          <h2>🔍 Resultados para: "{searchTerm}"</h2>
          <button className="clear-search-btn" onClick={limpiarBusqueda}>
            ✕ Limpiar búsqueda
          </button>
        </div>
      ) : (
        <h2>Todos nuestros vehículos disponibles</h2>
      )}

      <Filtros productos={todosProductos} onFiltrar={handleFiltrar} />

      {productosFiltrados.length === 0 ? (
        <div className="no-results">
          <h2> No se encontraron vehículos</h2>
          <p>Intentá con otros filtros o realizá una nueva búsqueda</p>
          {searchTerm && (
            <button className="clear-search-btn" onClick={limpiarBusqueda}>
              Ver todos los productos
            </button>
          )}
        </div>
      ) : (
        Object.values(productosPorCategoria).map((categoria) => (
          <div key={categoria.id_categoria} className="categoria-section">
            <h2>{categoria.nombre.toUpperCase()} ({categoria.productos.length})</h2>
            <div className="cards-container">
              {categoria.productos.map((producto) => (
                <Cards
                  key={producto.id_producto}
                  producto={producto}
                  categoriaNombre={categoria.nombre}
                />
              ))}
            </div>
          </div>
        ))
      )}

      <Outlet />
    </div>
  );
};

export default Catalogo;

