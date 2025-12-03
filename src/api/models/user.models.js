//=============Importaciones==============
import connection from "../database/db.js";


//=============Modelos de usuario==============
export const insertUser = (nombre, correo, hashContrasenia) => {
    const sql = "INSERT INTO usuarios (nombre, correo, contrasenia) VALUES (?, ?, ?)";

    return connection.query(sql, [nombre, correo, hashContrasenia]);
}