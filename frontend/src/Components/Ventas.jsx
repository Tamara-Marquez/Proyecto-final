import { useState, useEffect } from "react";
import "../Styles/Ventas.css";
import { ObtenerVentas } from "../Config/fetch-ventas";
import { toast } from "react-toastify";
import { ConfigToasty } from "../Config/Toasty";

const AdminVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
        setLoading(true);
        const data = await ObtenerVentas();
        console.log("📦 Ventas recibidas:", data);
        setVentas(data);
    } catch (error) {
        console.error("Error al cargar ventas:", error);
        toast.error("Error al cargar ventas", ConfigToasty);
    } finally {
        setLoading(false);
    }
};

    const exportarCSV = () => {
        let csv = "ID,Usuario,Email,Marca,Modelo,Total,Fecha\n";
        ventas.forEach((v) => {
        csv += `${v.id_venta},"${v.nombre_usuario}","${v.email}","${v.marca}","${v.modelo}",${v.total},"${v.fecha}"\n`;
    });

    const enlace = document.createElement("a");
    enlace.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    enlace.download = "ventas.csv";
    enlace.click();
};

    const ventasFiltradas = ventas.filter((v) => {
    const t = search.toLowerCase();
    return (
        v.nombre_usuario?.toLowerCase().includes(t) ||
        v.email?.toLowerCase().includes(t) ||
        v.marca?.toLowerCase().includes(t) ||
        v.modelo?.toLowerCase().includes(t)
    );
});

return (
    <div className="ventas-container">
        <h2 className="ventas-title">Panel de Ventas</h2>

        <div className="ventas-controles">
        <input
            type="text"
            placeholder="Buscar usuario, email, marca o modelo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={cargarVentas}>🔄 Refrescar</button>
        <button onClick={exportarCSV}>📥 Exportar CSV</button>
    </div>

        {loading ? (
            <p className="ventas-loading">Cargando ventas...</p>
        ) : ventasFiltradas.length === 0 ? (
            <p className="ventas-vacio">No hay ventas</p>
        ) : (
            <table className="ventas-tabla">
            <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
                {ventasFiltradas.map((v) => (
                <tr key={v.id_venta}>
                    <td>#{v.id_venta}</td>
                    <td>{v.nombre_usuario}</td>
                    <td>{v.email}</td>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td>${parseFloat(v.total).toFixed(2)}</td>
                </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
};

export default AdminVentas;