const{Router} = require('express');
const{body, query} = require('express-validator'); 
const controladorPedidosLlevar = require('../controladores/ControladorPedidosLlevar');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();
rutas.get('/',controladorimpresion.Iniciollevarpedidos);
rutas.get('/listar',passport.ValidarAutendicado,controladorPedidosLlevar.Listar);
rutas.post('/guardar',
body('idpedido')
.notEmpty().withMessage('Debe escribir una id de pedido')
.isInt().withMessage('La id del pedido debe ser un numero entero'),
body('idcliente')
.notEmpty().withMessage('Debe escribir una id de cliente')
.isInt().withMessage('La id del cliente debe ser un numero entero'),
controladorPedidosLlevar.Guardar);

module.exports = rutas;