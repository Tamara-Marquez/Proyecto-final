import express from "express";

const appp = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.status(404).send("Has ingresado una URL sin procesamiento");
});




// llamando al servidor

app.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080")});