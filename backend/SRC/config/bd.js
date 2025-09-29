import { createPool } from "mysql2/promise"
const pool = createPool ({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "Tienda",
    port: 3306,
    waitForConnections: true,
});

export default pool;

// backend/routes/productos.js
