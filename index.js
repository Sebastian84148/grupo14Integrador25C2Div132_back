//========Importaciones==========
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";


//========Importaciones de middlewares==========
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { rutasVistas, rutasProducto, rutasAutenticacion, rutasVentas } from "./src/api/routes/index.js"; //Importacion de router
import session from "express-session";

//Importamos la configuracion para poder trabajar con rutas y archivos estaticos
import {__dirname, join} from "./src/api/utils/index.js";


const app = express();
const PORT = environments.port;
const SESSION_KEY = environments.session_key;


//================Middlewares de aplicacion==================
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(join(__dirname, "src", "public")));


//================Configurando EJS==================
app.set("view engine", "ejs"); //Configuramos EJS como motor de vistas
app.set("views", join(__dirname, "src", "views")); //Indicamos la ruta donde se encuentran las vistas EJS


// Conexion del Router rutasProducto a la URL con el prefijo /api/productos
app.use("/api/productos", rutasProducto);


// Conexion del Router rutasVistas a la URL con el prefijo /
app.use("/", rutasVistas);


// Conexion del Router rutasAutenticacion a la URL con el prefijo /auth
app.use("/auth", rutasAutenticacion);


app.use("/api/ventas", rutasVentas);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});