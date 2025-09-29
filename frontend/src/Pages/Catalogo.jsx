import { Outlet, useParams } from "react-router-dom";
import productosData from "../Data/Products.json";
import Cards from '../Components/Cards';
import '../Styles/ProductCard.css';

const Catalogo = () => {
  return (
    <div className="catalogo">
      <h2>Todos nuestros vehículos disponibles</h2>
      {productosData.categorias.map((categoria) => (
        <div key={categoria.id_categoria}>
          <h2>{categoria.nombre.toUpperCase()}</h2>
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
      ))}
      <Outlet />
    </div>
  );
};





export default Catalogo;
