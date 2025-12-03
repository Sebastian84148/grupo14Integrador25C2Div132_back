//=============Importaciones==============
import connection from "../database/db.js";


//=============Modelos de ventas==============
export const insertSale = (fecha, nombre_usuario, total) => {
    const sqlVentas = "INSERT INTO ventas (fecha, nombre_usuario, total) VALUES (?, ?, ?)";

    return connection.query(sqlVentas, [fecha, nombre_usuario, total]);
}

export const insertSaleDetail = (ventaId, productId) => {
    const sqlDetalleVentas = "INSERT INTO detalle_ventas (venta_id, producto_id) VALUES (?, ?)";

    return connection.query(sqlDetalleVentas, [ventaId, productId]);
}