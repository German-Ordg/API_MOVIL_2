const{Router} = require('express');
const{body, query} = require('express-validator'); //ponemos donde vamos hacer la validacion
const controladorPedidosMesa = require('../controladores/ControladorPedidosMesa');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();

rutas.get('/listar',passport.ValidarAutendicado,controladorPedidosMesa.Listar);
rutas.get('/',controladorimpresion.Iniciopedidosmesa);

rutas.post('/guardar',
body('idpedido').notEmpty().withMessage('debe escribir un id de pedido').isInt().withMessage('el id del pedido debe ser un numero entero') ,
body('idmesa').notEmpty().withMessage('debe escribir un id de Mesa').isInt().withMessage('el id de la Mesa debe ser un numero entero') ,
body('cuenta').notEmpty().withMessage('debe escribir una cuenta').isInt().withMessage('La cuenta debe ser un numero entero') ,
body('nombrecuenta').notEmpty().withMessage('Debe escribir un nombre de cuenta').isString().withMessage('Debe ser una cadena de letras').isLength({max:45}).withMessage('Debe escribir un nombre de cuenta menor a 45 caracteres'),
controladorPedidosMesa.Guardar);

module.exports = rutas;