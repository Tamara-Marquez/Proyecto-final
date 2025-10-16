import React from 'react';
import { useFavorites } from '../Context/favorite.jsx';
import '../Styles/Favorites.css'


const  Favoritos=()=> {
    const { favoritos,removeFromFavorite, clearFavorite} = useFavorites();

    if (favoritos.length===0) {
        return <h3>No tienes productos favoritos ❤️</h3>
    }


return (
    <section className='favorite-container'>
        <h2>Mis favoritos ❤️ </h2>
        <button onClick={clearFavorite}>Borrar todos</button>
        <aside className='favorite-second'>
            {favoritos.map(producto => (
                <div key={producto.id_producto} className="favorito-item">
                <img src={producto.image} alt={producto.marca} />
                <h3>{producto.marca} {producto.modelo}</h3>
                <p>${producto.precio}</p>
            <button onClick={() => removeFromFavorite(producto.id_producto)}>
                Quitar
            </button>
            </div>
            ))}
        </aside>
    </section>
)
};

export default Favoritos;