import {createProduct} from '../Config/fetch-products.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from "../Config/api.js";
import '../Styles/newProduct.css'; 
import { toast } from 'react-toastify';
import { ConfigToasty } from '../Config/Toasty.jsx';

const CrearProducto = ()=> {
    const [values, setValues] = useState ({
        marca: "",
        modelo: "",
        anio: "",
        precio: "",
        descripcion: "",
        image: "",
        id_categoria: "",
        id_usuario: 1
    });

    const [categorias, setCategorias] = useState([]);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues ({
            ...values,
            [name] : value,
        });
    };

    useEffect(() => {
    const fetchCategorias = async () => {
        try {
            const response = await axios.get(`${API_URL}/categoria`);
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
    }
    };
    fetchCategorias();
}, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
    try{
        const nuevoProducto= await createProduct(values);
        toast.success("Producto creado con éxito!",ConfigToasty);
        console.log("Producto creado:", nuevoProducto);

        setValues ({
            marca: "",
            modelo: "",
            anio: "",
            precio: "",
            descripcion: "",
            image: "",
            id_categoria: "",
        })
        
    } catch(error) {
        console.error (error)
            toast.error("Error al cargar el producto", ConfigToasty)
        }
    };

return (
    <div className="new-product-container">
    <div className="new-product-card">
        <h2 className="new-product-title">Crear nuevo producto</h2>
    <form onSubmit={handleSubmit}>
        <img
        src={values.image || "/placeholder.jpg"}
        alt="Vista previa"
        className="image-preview"
    />
    <input
        type="text"
        name="marca"
        placeholder="Marca"
        value={values.marca}
        onChange={handleChange}
        className="product-input"
    />
    <input
        type="text"
        name="modelo"
        placeholder="Modelo"
        value={values.modelo}
        onChange={handleChange}
        className="product-input"
    />
    <input
        type="number"
        name="anio"
        placeholder="Año"
        value={values.anio}
        onChange={handleChange}
        className="product-input"
    />
    <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={values.precio}
        onChange={handleChange}
        className="product-input"
    />
    <textarea
        name="descripcion"
        placeholder="Descripción"
        value={values.descripcion}
        onChange={handleChange}
        className="product-input"
    />
    <input
        type="text"
        name="image"
        placeholder="URL de imagen"
        value={values.image}
        onChange={handleChange}
        // className="image-preview"
        className="product-input"
    />
    <select
        name="id_categoria"
        value={values.id_categoria}
        onChange={handleChange}
        className="product-input"
        required
    >
        <option value="">-- Selecciona categoría --</option>
        {categorias.map((cat) => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
        </option>
        ))}
    </select>
        <button type="submit" className="create-button">Crear producto</button>
    </form>
    </div>
    </div>
)}

export default CrearProducto