// import productosData from "../Data/Products.json";
// import Cards from '../Components/Cards';
// import { useState } from 'react';
// import Filtros from './Filter';
// import '../Styles/ProductCard.css'

// const Autos = () => {
//   const autos = productosData.categorias.find (
//     (cat) => cat.nombre === 'auto'
//   ).productos;

//   const [filtros, setFiltros] = useState ({marca:"", anio:""});

//   const autosFiltrados = autos
//     .filter((auto) =>
//       filtros.marca ? auto.marca === filtros.marca : true
//     )
//     .filter((auto) =>
//       filtros.anio ? auto.anio.toString() === filtros.anio : true
//     );

//   return ( 
//     <div>
//       <h2>Autos</h2>

//       <Filtros productos= {autos} onFiltrar={setFiltros} />

//       <div className="cards-container">
//         {autosFiltrados.map ((auto) => (
//             <Cards
//             key={auto.id_producto}
//             producto={auto}
//             categoriaNombre="auto"
//             />
//         )
//         )}
//       </div>
//     </div>
//   )

// } 

// export default Autos;

import productosData from "../Data/Products.json";
import Cards from '../Components/Cards';
import { useState } from 'react';
import Filtros from './Filter';
import '../Styles/ProductCard.css'

const Autos = () => {
  const autos = productosData.categorias.find (
    (cat) => cat.nombre === 'auto'
  ).productos;

  const [filtros, setFiltros] = useState ({marca:"", anio:""});

  const autosFiltrados = autos
    .filter((auto) =>
      filtros.marca ? auto.marca === filtros.marca : true
    )
    .filter((auto) =>
      filtros.anio ? auto.anio.toString() === filtros.anio : true
    );

  return ( 
    <div>
      <h2>Autos</h2>

      <Filtros productos= {autos} onFiltrar={setFiltros} />

      <div className="cards-container">
        {autosFiltrados.map((auto) => (
            <Cards
            key={auto.id_producto}  // ✅ CORRECTO: auto.id_producto (no autos.id_producto)
            producto={auto}
            categoriaNombre="auto"
            />
        ))}
      </div>
    </div>
  )
} 

export default Autos;