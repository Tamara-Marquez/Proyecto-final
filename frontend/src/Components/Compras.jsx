import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ConfigToasty } from "../Config/Toasty";
import { obtenerVentasUsuario } from "../Config/fetch-ventas"; 
import '../Styles/Compras.css'
import { useAuth } from "../Context/auth.jsx";

const MisCompras = () => {
    const { user } = useAuth();
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (user && user.id_usuario) {
            cargarVentas(user.id_usuario);
        } else {
            console.warn("⚠️ No hay usuario logueado o falta id_usuario");
            setLoading(false);
        }
    }, [user]);


const cargarVentas = async (idUsuario) => {
        if (!idUsuario) {
            console.error("❌ ID de usuario inválido, no se cargan ventas.");
            return;
        }

        setLoading(true);
        try {
            const data = await obtenerVentasUsuario(idUsuario);
            console.log("✅ Ventas cargadas:", data);
            setVentas(data);
        } catch (error) {
            console.error("Error al cargar ventas:", error);
            toast.error("No se pudieron cargar tus compras", ConfigToasty);
        } finally {
            setLoading(false);
        }
    };

if (loading) {
    return <div className="loading">Cargando tus compras...</div>;
}

if (!ventas.length) {
    return <div className="emptyState">No tienes compras registradas.</div>;
}

return (
    <div className="mis-compras-container">
        <h2>Mis Compras</h2>

        <button className="btn-refresh" onClick={cargarVentas}>
        🔄 Refrescar
        </button>

        {loading ? (
        <p>Cargando tus compras...</p>
        ) : ventas.length === 0 ? (
            <p>No has realizado compras aún.</p>
        ) : (
        <table className="tabla-compras">
            <thead>
                <tr>
                    <th>ID Venta</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Subtotal</th>
            </tr>
        </thead>
            <tbody>
                {ventas.map((v) => (
                    <tr key={v.id_venta + "-" + (v.id_producto ?? Math.random())}>
                    <td>#{v.id_venta}</td>
                    <td>{v.id_producto ?? "N/A"}</td>
                    <td>{v.marca || "-"}</td>
                    <td>{v.modelo || "-"}</td>
                    <td>{v.anio || "-"}</td>
                    <td>${parseFloat(v.subtotal ?? v.total).toFixed(2)}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
};

export default MisCompras;
