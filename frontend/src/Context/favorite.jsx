import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider ({children}) {

    const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem("favoritos");
    return stored ? JSON.parse(stored) : [];
});

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
}, [favoritos]);


const addToFavorite = (producto)=>{
    const alreadyFavorite= favoritos.some(
        (item)=> item.id_producto === producto.id_producto);
        if (!alreadyFavorite) {
            setFavoritos([...favoritos, producto]);
        }
};

const removeFromFavorite= (id_producto) => {
    setFavoritos(favoritos.filter((item)=> item.id_producto !== id_producto));
};


const clearFavorite = ()=> setFavoritos([]);


return (
    <FavoriteContext.Provider value={{
        favoritos, 
        addToFavorite, 
        removeFromFavorite, 
        clearFavorite
    }}
    >
        {children}
    </FavoriteContext.Provider>
);
}

export function useFavorites() {
    return useContext(FavoriteContext)
};
