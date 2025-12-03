//=============Importacion de modelos de usuario==============
import { insertUser } from "../models/user.models.js";


//=============Importacion de funciones de bcrypt==============
import { hashPassword } from "../utils/bcrypt.js";


//=============Controladores de usuario==============
export const createUser = async (req, res) => {
    try {
        const { nombre, correo, contrasenia} = req.body;

        if(!nombre || !correo || !contrasenia) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }

        const hashContrasenia = await hashPassword(contrasenia);

        const [rows] = await insertUser(nombre, correo, hashContrasenia);

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.error("Error al crear usuario: ", error);

        res.status(500).json({
            message: "Erro interno del servidor al crear un usuario"
        });
    }
}