const{Router} = require('express');
const{body, query} = require('express-validator'); 
const ControladorPedidosCancelados = require('../controladores/ControladorPedidosCancelados');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();

rutas.get('/',controladorimpresion.Iniciopedidoscancelados);
rutas.get('/listar',passport.ValidarAutendicado,ControladorPedidosCancelados.Listar);
rutas.post('/guardar',
body('numeropedido')
.notEmpty().withMessage('Debe escribir una id de detalle pedido')
.isInt().withMessage('La id de detalle pedido debe ser un numero entero'),
body('usuario')
.notEmpty().withMessage('Debe escribir una id de usuario')
.isInt().withMessage('La id del usuario debe ser un numero entero'),
ControladorPedidosCancelados.Guardar);


module.exports = rutas;