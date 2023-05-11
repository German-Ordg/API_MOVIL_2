const{Router} = require('express');
const controladorProductos = require('../controladores/ControladorProductos');
const passport = require('../configuraciones/passport');
const rutas = Router();
rutas.get('/listar',passport.ValidarAutendicado,controladorProductos.Listar);

module.exports = rutas;