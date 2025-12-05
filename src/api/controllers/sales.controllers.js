//=============Importacion de modelos de ventas==============
import { insertSale, insertSaleDetail } from "../models/sales.models.js";


//=============Controladores de ventas==============
export const createSale = async (req, res) => {
    try {
        const { fecha, nombre_usuario, total, productos } = req.body;

        if(!fecha || !nombre_usuario || !total || !Array.isArray(productos)) {
            return res.status(400).json({
                message: "Faltan campos obligatorios por completar"
            });
        }

        const [rows] = await insertSale(fecha, nombre_usuario, total, productos);
        const ventaId = rows.insertId;

        for(const prod of productos) {
            await insertSaleDetail(ventaId, prod.id, prod.cantidad);
        }

        res.status(201).json({
            message: "Venta registrada con exito",
        });

    } catch (error) {
        console.error("Error al registrar venta:", error);

        res.status(500).json({
            message: "Error interno del servidor al registrar la venta"
        });
    }
}