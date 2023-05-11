const msj = (res, estado, mensaje) => {
    res.setHeader("Content-Type","application/json");
    res.statusCode=estado;
    res.json(mensaje);
}

module.exports = msj;