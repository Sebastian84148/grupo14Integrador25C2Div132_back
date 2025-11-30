//========Importaciones==========
import express from "express";
import environments from "./api/config/environments.js";
import connection from "./api/database/db.js";
import cors from "cors";


const app = express();
const PORT = environments.port;



//========Middlewares==========
app.use(cors());


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


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});