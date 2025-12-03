import { selectAllProducts } from "../models/product.models.js";


//=============Controladores de vistas==============
export const getIndex =  async (req, res) => {
    try {
        const [rows] = await selectAllProducts();

        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            products: rows
        });

    } catch (error) {
        console.error(error)
    }
}

export const getConsultar = async (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id",
    });
}

export const getCrear = (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto",
    });
}

export const getModificar = (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto",
    });
}

export const getEliminar = (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto",
    });
}

export const getLogin = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Login-dashboard"
    });
}