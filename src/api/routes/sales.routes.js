//========Importacion e inicializacion de Router==========
import { Router } from "express";

const router = Router();

//========Importacion de controladores de ventas==========
import { createSale } from "../controllers/sales.controllers.js";


//========Rutas ventas==========
router.post("/", createSale);

export default router;