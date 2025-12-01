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

// GET /api/productos ==>  Enviamos todos los productos.
app.get("/api/productos", async (req, res) => {
    try {
        const sql = "SELECT id, nombre, precio, categoria, img_url, activo FROM productos";
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

// GET /api/productos/id ==> Enviamos el producto con el id correspondiente.
app.get("/api/productos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const sql = "SELECT id, nombre, precio, categoria, img_url, activo FROM productos WHERE productos.id = ? LIMIT 1";
        const [rows] = await connection.query(sql, [id]);

        if(rows.length === 0) {
            return res.status(404).json({
                message: `No existe el producto con el id ${id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        console.log("Error obteniendo el producto por id:", error.message);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

// POST /api/productos ==> Recibimos datos en req.body y creamos un nuevo producto en la base de datos.
app.post("/api/productos", async (req, res) => {
    try {
        const {nombre, precio, categoria, img_url} = req.body;

        if(!nombre || !precio || !categoria || !img_url) {
            return res.status(400).json({
                message: "Faltan campos por completar"
            });
        }

        const sql = "INSERT INTO productos (nombre, precio, categoria, img_url) VALUES (?, ?, ?, ?)";
        const [rows] = await connection.query(sql, [nombre, precio, categoria, img_url]);

        if(rows.affectedRows === 0) {
            return res.status(400).json({
                message: "No se pudo crear el producto"
            });
        }

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

// PUT /api/productos ==> Recibimos datos en req.body y actualizamos el producto con el id correspondiente.
app.put("/api/productos", async (req, res) => {
    try {
        const {id, nombre, precio, categoria, img_url, activo} = req.body;

        if(!id || !nombre || !precio || !categoria || !img_url || !activo) {
            return res.status(400).json({
                message: "Faltan campos por completar"
            });
        }

        const sql = "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, img_url = ?, activo = ? WHERE id = ?";
        const [rows] = await connection.query(sql, [nombre, precio, categoria, img_url, activo, id]);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: `No se pudo encontrar al producto con id ${id} para actualizarlo`
            });
        }

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

// DELETE /api/productos/:id ==> Eliminamos el producto con el id correspondiente.
app.delete("/api/productos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const sql = "DELETE FROM productos WHERE id = ?";
        const [rows] = await connection.query(sql, [id]);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: `No se pudo encontrar al producto con id ${id} para eliminarlo`
            });
        }

        res.status(200).json({
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.log("Error al eliminar un producto por su id: ", error.message);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});