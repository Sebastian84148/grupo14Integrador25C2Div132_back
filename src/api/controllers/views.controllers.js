//=============Controladores de main==============
export const getIndex =  (req, res) => {
    res.render("index");
}

export const getConsultar = (req, res) => {
    res.render("consultar");
}

export const getCrear = (req, res) => {
    res.render("crear");
}

export const getModificar = (req, res) => {
    res.render("modificar");
}

export const getEliminar = (req, res) => {
    res.render("eliminar");
}