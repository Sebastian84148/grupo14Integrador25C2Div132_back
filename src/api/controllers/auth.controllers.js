//=============Importacion de modelos de autenticacion==============
import { selectUserByEmail } from "../models/auth.models.js";


//=============Importacion de funciones de bcrypt==============
import { comparePassword } from "../utils/bcrypt.js";


//=============Controladores de autenticacion==============
export const postLogin = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;

        if(!correo || !contrasenia) {
            return res.render("login", {
                title: "Login",
                about: "Login-dashboard",
                error: "Todos los campos son obligatorios"
            });
        }

        const [rows] = await selectUserByEmail(correo);

        if(rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Login-dashboard",
                error: "Credenciales invalidas"
            });
        }

        const user = rows[0];

        const match = await comparePassword(contrasenia, user.contrasenia);

        if(!match) {
            return res.render("login", {
                title: "Login",
                about: "Login-dashboard",
                error: "Credenciales invalidas"
            });
        }

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo
        }

        return res.redirect("/");

    } catch (error) {
        console.error("Error en el login ", error)

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

export const postLogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error("Error al destruir la sesion ", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
}