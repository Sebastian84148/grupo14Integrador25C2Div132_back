//========Importacion e inicializacion de Router==========
import { Router } from "express";
const router = Router();


//========Importacion de middlewares==========
import { validateId } from "../middlewares/middlewares.js";


//========Importacion de controladores de producto==========
import { createProduct, getActiveProducts, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";


//==============Rutas producto front==============
router.get("/activos", getActiveProducts);


//==============Rutas producto back==============
// GET /api/productos ==>  Enviamos todos los productos.
router.get("/", getAllProducts);

// GET /api/productos/id ==> Enviamos el producto con el id correspondiente.
router.get("/:id", validateId, getProductById);

// POST /api/productos ==> Recibimos datos en req.body y creamos un nuevo producto en la base de datos.
router.post("/", createProduct);

// PUT /api/productos/:id ==> Recibimos datos en req.body y actualizamos el producto con el id de req.params.
router.put("/:id", validateId, modifyProduct);

// DELETE /api/productos/:id ==> Eliminamos el producto con el id correspondiente.
router.delete("/:id", validateId, removeProduct);

export default router;