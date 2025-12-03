//========Importacion e inicializacion de Router==========
import { Router } from "express";
const router = Router();


//========Importacion de controladores de usuario==========
import { createUser } from "../controllers/user.controllers.js";


//==============Rutas usuario==============
router.post("/", createUser);

export default router;