const{Router} = require('express');
const{body, query} = require('express-validator'); 
const controladorEntregaPedido = require('../controladores/ControladorEntregaPedido');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();
rutas.get('/',controladorimpresion.Inicioentregapedido);
rutas.get('/listar',passport.ValidarAutendicado,controladorEntregaPedido.Listar);
rutas.post('/guardar',
body('iddetalle_pedido')
.notEmpty().withMessage('Debe escribir una id de detalle pedido')
.isInt().withMessage('La id de detalle pedido debe ser un numero entero'),
body('usuario')
.notEmpty().withMessage('Debe escribir una id de usuario')
.isInt().withMessage('La id del usuario debe ser un numero entero'),
controladorEntregaPedido.Guardar);

module.exports = rutas;