//========Importaciones==========
import express from "express";
import environments from "./api/config/environments.js";
import cors from "cors";


//========Importaciones de middlewares==========
import { loggerUrl } from "./api/middlewares/middlewares.js";
import { rutasProducto } from "./api/routes/index.js"; //Importacion de router


const app = express();
const PORT = environments.port;


//========Middlewares de aplicacion==========
app.use(cors());
app.use(loggerUrl);
app.use(express.json());


//========Endpoint Bienvenida==========
app.get("/", (req, res) => {
    res.send("Tecno Store");
});


// Conexion del Router rutasProducto a la URL /api/productos
app.use("/api/productos", rutasProducto);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});