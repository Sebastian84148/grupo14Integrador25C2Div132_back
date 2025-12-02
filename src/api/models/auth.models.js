//=============Importaciones==============
import connection from "../database/db.js";


//=============Modelos de autenticacion==============
export const selectUserByCredentials = (correo, contrasenia) => {
    const sql = "SELECT correo, contrasenia FROM usuarios WHERE correo = ? AND contrasenia = ?";

    return connection.query(sql, [correo, contrasenia]);
}