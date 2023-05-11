const{Router} = require('express');
const{body, query} = require('express-validator'); //ponemos donde vamos hacer la validacion
const controladorPedidosXventas = require('../controladores/ControladorPedidosXventas');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();

rutas.get('/listar',passport.ValidarAutendicado,controladorPedidosXventas.Listar);
rutas.get('/',controladorimpresion.Iniciopedidosxventas);

rutas.post('/guardar',
body('NumeroFactura').notEmpty().withMessage('debe escribir un numero de factura').isInt().withMessage('el numero de factura debe ser un numero entero') ,
body('NumeroPedido').notEmpty().withMessage('debe escribir un numero de pedido').isInt().withMessage('el numero de pedido debe ser un numero entero') ,
controladorPedidosXventas.Guardar);

module.exports = rutas;