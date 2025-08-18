import express from "express";
import rolesRouter from "./SRC/routes/roles-router.js"; 
import usuarioRouter from "./SRC/routes/usuario-router.js";
import categoriaRouter from "./SRC/routes/categorias-router.js";
import productosRouter from "./SRC/routes/productos-router.js";
import ventasRouter from "./SRC/routes/ventas-router.js";
import 'dotenv/config';

const app = express();
app.disable("x-powered-by");

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rolesRouter);
app.use(usuarioRouter);
app.use(categoriaRouter);
app.use(productosRouter);
app.use(ventasRouter);




app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});

app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});



startServer(process.env.APP_PORT);

function startServer(puerto) {
  const server = app.listen(puerto, () => {
    console.log(`Servidor escuchando en: http://localhost:${puerto}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Puerto ${puerto} en uso, intentando con el puerto ${puerto + 1}...`);
      puerto++;
      startServer(puerto); 
    } else {
      console.error("Error al iniciar el servidor:", err);
    }
  });
}


console.log(require("crypto").randomBytes(10).toString("hex"));


// llamando al servidor

/*app.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080")});*/