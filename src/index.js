//========Importaciones==========
import express from "express";
import environments from "./api/config/environments.js";
import connection from "./api/database/db.js";

const app = express();
const PORT = environments.port;


//========Endpoints==========
app.get("/", (req, res) => {
    res.send("Tecno Store");
});

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



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});