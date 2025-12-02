//========Importacion e inicializacion de Router==========
import { Router } from "express";
const router = Router();


//========Importacion de controladores de autenticacion==========
import { postLogin, postLogOut } from "../controllers/auth.controllers.js";


router.post("/login", postLogin);

router.post("/logout", postLogOut);

export default router;