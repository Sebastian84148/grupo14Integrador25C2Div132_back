//========Importaciones==========
import express from "express";
import environments from "./api/config/environments.js";
import connection from "./api/database/db.js";
import cors from "cors";


const app = express();
const PORT = environments.port;


//========Middlewares==========
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

//========Endpoints==========
app.get("/", (req, res) => {
    res.send("Tecno Store");
});

// GET /productos ==>  Enviamos todos los productos.
app.get("/productos", async (req, res) => {
    try {
        const sql = "SELECT * FROM productos";
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos:", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});

// GET /productos/id ==> Enviamos el producto con el id correspondiente.
app.get("/productos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const sql = "SELECT * FROM productos WHERE productos.id = ?";
        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo el producto por id:", error.message);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

// POST /productos ==> Recibimos datos en req.body y creamos un nuevo producto en la base de datos.
app.post("/productos", async (req, res) => {
    try {
        const {nombre, precio, categoria, img_url} = req.body;
        const sql = "INSERT INTO productos (nombre, precio, categoria, img_url) VALUES (?, ?, ?, ?)";
        const [rows] = await connection.query(sql, [nombre, precio, categoria, img_url]);

        res.status(201).json({
            message: "Producto creado con exito"
        });

    } catch (error) {
        console.log("Error al crear el producto", error.message);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

// PUT /productos ==> Recibimos datos en req.body y actualizamos el producto con el id correspondiente.
app.put("/productos", async (req, res) => {
    try {
        const {id, nombre, precio, categoria, img_url, activo} = req.body;
        const sql = "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, img_url = ?, activo = ? WHERE id = ?";
        const [rows] = await connection.query(sql, [nombre, precio, categoria, img_url, activo, id]);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log("Error al actualizar producto:", error.message);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});