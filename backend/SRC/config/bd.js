import { createPool } from "mysql2/promise"
import 'dotenv/config';
// const pool = createPool ({
//     host: "localhost",
//     user: "root",
//     password: "admin",
//     database: "Tienda",
//     port: 3306,
//     waitForConnections: true,
// });

// export default pool;

// backend/routes/productos.js

const pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    waitForConnections: process.env.MYSQL_WAIT_FOR_CONNECTIONS === 'true',
});
export default pool;