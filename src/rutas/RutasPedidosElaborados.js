const{Router} = require('express');
const{body, query} = require('express-validator'); 
const controladorPedidosElaborados = require('../controladores/ControladorPedidosElaborados');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();

rutas.get('/',controladorimpresion.Iniciopedidoselaborados);
rutas.get('/listar',passport.ValidarAutendicado,controladorPedidosElaborados.Listar);
rutas.post('/guardar',
body('iddetallepedido')
.notEmpty().withMessage('Debe escribir una id de detalle pedido')
.isInt().withMessage('La id de detalle pedido debe ser un numero entero'),
body('idusuario')
.notEmpty().withMessage('Debe escribir una id de usuario')
.isInt().withMessage('La id del usuario debe ser un numero entero'),
controladorPedidosElaborados.Guardar);


module.exports = rutas;