import { selectAllProducts, selectProductById } from "../models/product.models.js";

//=============Controladores de main==============
export const getIndex =  async (req, res) => {
    try {
        const [rows] = await selectAllProducts();

        res.render("index", {
            tittle: "Indice",
            about: "Lista de productos",
            products: rows
        });

    } catch (error) {
        console.log(error)
    }
}

export const getConsultar = async (req, res) => {
    res.render("consultar", {
        tittle: "Consultar",
        about: "Consultar producto por id",
    });
}

export const getCrear = (req, res) => {
    res.render("crear", {
        tittle: "Crear",
        about: "Crear producto",
    });
}

export const getModificar = (req, res) => {
    res.render("modificar", {
        tittle: "Modificar",
        about: "Actualizar producto",
    });
}

export const getEliminar = (req, res) => {
    res.render("eliminar", {
        tittle: "Eliminar",
        about: "Eliminar producto",
    });
}