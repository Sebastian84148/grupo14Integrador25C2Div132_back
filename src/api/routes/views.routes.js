//========Importacion e inicializacion de Router==========
import { Router } from "express";
const router = Router();


//========Importacion de controladores de main==========
import { getConsultar, getCrear, getEliminar, getIndex, getLogin, getModificar } from "../controllers/views.controllers.js";


//========Vistas==========
router.get("/", getIndex);

router.get("/consultar", getConsultar);

router.get("/crear", getCrear);

router.get("/modificar", getModificar);

router.get("/eliminar", getEliminar);

router.get("/login", getLogin);

export default router;