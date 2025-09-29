import productosData from "../Data/Products.json";
import Cards from "../Components/Cards";
import { useState } from "react";
import Filtros from "./Filter";
import '../Styles/ProductCard.css'

const Motos = () => {
  const motos = productosData.categorias.find(
    (cat) => cat.nombre === "moto"
  ).productos;

  const [filtros, setFiltros] = useState({ marca: "", anio: "" });

  const motosFiltradas = motos
    .filter((moto) =>
      filtros.marca ? moto.marca === filtros.marca : true
    )
    .filter((moto) =>
      filtros.anio ? moto.anio.toString() === filtros.anio : true
    );

  return (
    <div>
      <h2>MOTOS</h2>
      <Filtros productos={motos} onFiltrar={setFiltros} />

      <div className="cards-container">
        {motosFiltradas.map((moto) => (
          <Cards
            key={moto.id_producto}
            producto={moto}
            categoriaNombre="moto"
          />
        ))}
      </div>
    </div>
  );
};

export default Motos;
