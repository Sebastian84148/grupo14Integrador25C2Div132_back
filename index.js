//========Importaciones==========
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";


//========Importaciones de middlewares==========
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { rutasProducto } from "./src/api/routes/index.js"; //Importacion de router

//Importamos la configuracion para poder trabajar con rutas y archivos estaticos
import {__dirname, join} from "./src/api/utils/index.js";


const app = express();
const PORT = environments.port;


//========Middlewares de aplicacion==========
app.use(cors());
app.use(loggerUrl);
app.use(express.json());


app.use(express.static(join(__dirname, "src", "public")));


//========Endpoint Bienvenida==========
app.get("/", (req, res) => {
    res.send("Tecno Store");
});


// Conexion del Router rutasProducto a la URL /api/productos
app.use("/api/productos", rutasProducto);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});