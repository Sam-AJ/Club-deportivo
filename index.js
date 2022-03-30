const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')

app.use(bodyParser.json());

app.listen(3000, () => console.log("Servidor express activo http://localhost:3000"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/deportes", (req, res) => {
    res.sendFile(`${__dirname}/data/deportes.json`);
})

app.post("/agregar", (req, res) => {
    let {nombre, precio} = req.body;
    let contenido = fs.readFileSync(`${__dirname}/data/deportes.json`);
    contenido = JSON.parse(contenido);
    if (contenido.deportes.find(deporte => deporte.nombre == nombre)) {
        res.send("El deporte ya existe");
    } else {
        contenido.deportes.push({nombre, precio});
        contenido = JSON.stringify(contenido, null, 4);
        fs.writeFileSync(`${__dirname}/data/deportes.json`, contenido, "utf8");
        res.send("Registro exitoso");
    }
})

app.put("/editar", (req, res) => {
    let {nombre, precio} = req.body;
    let contenido = fs.readFileSync(`${__dirname}/data/deportes.json`);
    contenido = JSON.parse(contenido);
    if (contenido.deportes.find(deporte => deporte.nombre == nombre)) {
        let indice = contenido.deportes.findIndex(deporte => deporte.nombre == nombre);
        contenido.deportes[indice].precio = precio;
        contenido = JSON.stringify(contenido, null, 4);
        fs.writeFileSync(`${__dirname}/data/deportes.json`, contenido, "utf8");
        res.send("Actualización exitosa");
    } else {
        res.send("No es posible actualizar el registro");
    }
})


app.delete("/eliminar", (req, res) => {
    let nombre = req.query.nombre;
    let contenido = fs.readFileSync(`${__dirname}/data/deportes.json`);
    contenido = JSON.parse(contenido);
    if (contenido.deportes.find(deporte => deporte.nombre == nombre)) {
        let indice = contenido.deportes.findIndex(deporte => deporte.nombre == nombre);
        contenido.deportes.splice(indice, 1);
        contenido = JSON.stringify(contenido, null, 4);
        fs.writeFileSync(`${__dirname}/data/deportes.json`, contenido, "utf8");
        res.send("Eliminación exitosa");
    } else {
        res.send("No es posible eliminar el registro");
    } 
})