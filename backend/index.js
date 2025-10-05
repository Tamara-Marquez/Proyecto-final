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


// startServer(process.env.APP_PORT);

// function startServer(puerto) {
//   const server = app.listen(puerto, () => {
//     console.log(`Servidor escuchando en: http://localhost:${puerto}`);
//   });

//   server.on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//       console.log(`Puerto ${puerto} en uso, intentando con el puerto ${puerto + 1}...`);
//       puerto++;
//       startServer(puerto); 
//     } else {
//       console.error("Error al iniciar el servidor:", err);
//     }
//   });
// }


