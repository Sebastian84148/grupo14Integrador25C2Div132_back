//========Importacion e inicializacion de Router==========
import { Router } from "express";
const router = Router();


//========Importacion de modulos==========
import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";


//==============Definicion de rutas==============
// GET /api/productos ==>  Enviamos todos los productos.
router.get("/", async (req, res) => {
    try {
        const sql = "SELECT id, nombre, precio, categoria, img_url, activo FROM productos";
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos:", error.message);

        res.status(500).json({
            message: "Error interno del servidor al intentar obtener productos"
        });
    }
});

// GET /api/productos/id ==> Enviamos el producto con el id correspondiente.
router.get("/:id", validateId, async (req, res) => {
    try {
        const {id} = req.params;
        const sql = "SELECT id, nombre, precio, categoria, img_url, activo FROM productos WHERE id = ? LIMIT 1";
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
            message: "Error interno del servidor al intentar obtener el producto por id"
        });
    }
});

// POST /api/productos ==> Recibimos datos en req.body y creamos un nuevo producto en la base de datos.
router.post("/", async (req, res) => {
    try {
        const {nombre, precio, categoria, img_url} = req.body;

        if(!nombre || !precio || !categoria || !img_url) {
            return res.status(400).json({
                message: "Faltan campos obligatorios por completar"
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
            message: "Producto creado correctamente"
        });

    } catch (error) {
        console.log("Error al crear el producto", error.message);

        res.status(500).json({
            message: "Error interno del servidor al intentar crear el producto"
        });
    }
});

// PUT /api/productos/:id ==> Recibimos datos en req.body y actualizamos el producto con el id de req.params.
router.put("/:id", validateId, async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, precio, categoria, img_url, activo} = req.body;

        if(!nombre || !precio || !categoria || !img_url || activo === undefined) {
            return res.status(400).json({
                message: "Faltan campos obligatorios por completar"
            });
        }

        const sql = "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, img_url = ?, activo = ? WHERE id = ?";
        const [rows] = await connection.query(sql, [nombre, precio, categoria, img_url, activo, id]);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: `No se pudo encontrar al producto con id ${id}`
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log("Error al actualizar el producto:", error.message);

        res.status(500).json({
            message: "Error interno del servidor al intentar actualizar el producto"
        });
    }
});

// DELETE /api/productos/:id ==> Eliminamos el producto con el id correspondiente.
router.delete("/:id", validateId, async (req, res) => {
    try {
        const {id} = req.params;
        const sql = "DELETE FROM productos WHERE id = ?";
        const [rows] = await connection.query(sql, [id]);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: `No se pudo encontrar al producto con id ${id}`
            });
        }

        res.status(200).json({
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.log("Error al eliminar el producto: ", error.message);

        res.status(500).json({
            message: "Error interno del servidor al intentar eliminar el producto"
        });
    }
});

export default router;