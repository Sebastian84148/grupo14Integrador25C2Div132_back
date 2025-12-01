const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

const validateId = (req, res, next) => {
    const {id} = req.params;

    const idNumero = Number(id);

    if(isNaN(idNumero) || !Number.isInteger(idNumero) || idNumero <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.params.id = idNumero;

    next();
}

export {
    loggerUrl,
    validateId
}