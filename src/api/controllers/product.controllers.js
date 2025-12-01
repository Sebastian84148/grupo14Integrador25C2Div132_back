//=============Importacion de modelos de producto==============
import { deleteProduct, insertProduct, selectAllProducts, selectProductById, updateProduct } from "../models/product.models.js";


//=============Controladores de producto==============
//Controlador para obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await selectAllProducts();
        
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos:", error.message);

        res.status(500).json({
            message: "Error interno del servidor al intentar obtener productos"
        });
    }
}

//Controlador para obtener un producto filtrado su id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await selectProductById(id);

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
}

//Controlador para crear un producto
export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, categoria, img_url } = req.body;

        if(!nombre || !precio || !categoria || !img_url) {
            return res.status(400).json({
                message: "Faltan campos obligatorios por completar"
            });
        }

        const [rows] = await insertProduct(nombre, precio, categoria, img_url);

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
}

//Controlador para actualizar un producto filtrado su id
export const modifyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, categoria, img_url, activo } = req.body;

        if(!nombre || !precio || !categoria || !img_url || activo === undefined) {
            return res.status(400).json({
                message: "Faltan campos obligatorios por completar"
            });
        }

        const [rows] = await updateProduct(nombre, precio, categoria, img_url, activo, id);

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
}

//Controlador para eliminar un producto filtrado su id
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await deleteProduct(id);

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
}