import express from "express";
import cors from "cors";
import rolesRouter from "./SRC/routes/roles-router.js"; 
import usuarioRouter from "./SRC/routes/usuario-router.js";
import categoriaRouter from "./SRC/routes/categorias-router.js";
import productosRouter from "./SRC/routes/productos-router.js";
import ventasRouter from "./SRC/routes/ventas-router.js";
import autenUsuario from './SRC/routes/auten-usuario.js'


import 'dotenv/config';

const app = express();
app.disable("x-powered-by");

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use("/api", rolesRouter);
app.use("/api", usuarioRouter);
app.use("/api", categoriaRouter);
app.use("/api", productosRouter);
app.use("/api", ventasRouter);
app.use ("/api", autenUsuario);




app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});



app.listen(process.env.APP_PORT, () => {
  console.log(
    `Servidor escuchando en: http://localhost:${process.env.APP_PORT}`
  );
});



