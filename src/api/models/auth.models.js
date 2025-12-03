//=============Importaciones==============
import connection from "../database/db.js";


//=============Modelos de autenticacion==============
export const selectUserByEmail = (correo) => {
    const sql = "SELECT id, nombre, correo, contrasenia FROM usuarios WHERE correo = ?";

    return connection.query(sql, [correo]);
}