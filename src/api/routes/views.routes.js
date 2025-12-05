//========Importacion e inicializacion de Router==========
import { Router } from "express";
const router = Router();


//========Importacion de middlewares==========
import { requireLogin } from "../middlewares/middlewares.js";


//========Importacion de controladores de main==========
import { getConsultar, getCrear, getCrearUsuario, getEliminar, getIndex, getLogin, getModificar } from "../controllers/views.controllers.js";


//========Vistas==========
router.get("/", requireLogin, getIndex);

router.get("/consultar", requireLogin, getConsultar);

router.get("/crear", requireLogin, getCrear);

router.get("/modificar", requireLogin, getModificar);

router.get("/eliminar", requireLogin, getEliminar);

router.get("/login", getLogin);

router.get("/crear_usuario", requireLogin, getCrearUsuario);

export default router;