//=============Importaciones==============
import connection from "../database/db.js";


//=============Modelos de producto==============
//Le pedimos a la conexion a la BBDD que traiga todos los productos
export const selectAllProducts = () => {
    const sql = "SELECT id, nombre, precio, categoria, img_url, activo FROM productos";

    return connection.query(sql);
}

//Le pedimos a la conexion a la BBDD que traiga un producto filtrado por su id
export const selectProductById = (id) => {
    const sql = "SELECT id, nombre, precio, categoria, img_url, activo FROM productos WHERE id = ? LIMIT 1";

    return connection.query(sql, [id]);
}

//Le pedimos a la conexion a la BBDD que cree un producto
export const insertProduct = (nombre, precio, categoria, img_url) => {
    const sql = "INSERT INTO productos (nombre, precio, categoria, img_url) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [nombre, precio, categoria, img_url]);
}

//Le pedimos a la conexion a la BBDD que actualize un producto filtrado por su id
export const updateProduct = (nombre, precio, categoria, img_url, activo, id) => {
    const sql = "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, img_url = ?, activo = ? WHERE id = ?";

    return connection.query(sql, [nombre, precio, categoria, img_url, activo, id]);
}

//Le pedimos a la conexion a la BBDD que elimine un producto filtrado su id
export const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    return connection.query(sql, [id]);
}