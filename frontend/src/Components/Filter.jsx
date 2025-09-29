import '../Styles/ProductCard.css';
import { useState, useEffect } from "react";
import '../Styles/ProductCard.css'
import { useCart } from '../Hooks/useCart.js'

const Filtros = ({productos, onFiltrar}) => {

    const [marca, setMarca] = useState ("");
    const [anio, setAnio] = useState ("");

    const [marcasDisponibles, setMarcasDisponibles] = useState([]);
    const [aniosDisponibles, setAniosDisponibles] = useState([]);

        useEffect(() => {
            if (productos) {
            const marcas = [...new Set(productos.map((p) => p.marca))];
            const anios = [...new Set(productos.map((p) => p.anio))];
            setMarcasDisponibles(marcas);
            setAniosDisponibles(anios.sort((a, b) => b - a));
    }
    }, [productos]);

        useEffect(() => {
            onFiltrar({ marca, anio });
        },
        [marca, anio, onFiltrar]);


    return (
        <div className="filtros">
            <select value={marca} onChange={(e) => setMarca(e.target.value)}>
            <option value="">Todas las marcas</option>
                {marcasDisponibles.map((m, i) => (
                    <option key={i} value={m}>
                        {m}
            </option>
        ))}
            </select>
            <select value={anio} onChange={(e) => setAnio(e.target.value)}>
            <option value="">Todos los años</option>
                {aniosDisponibles.map((a, i) => (
                    <option key={i} value={a}>
                        {a}
                        </option>
        ))}
    </select>
    </div>
);
};

export default Filtros;