const{Router} = require('express');
const{body, query} = require('express-validator');
const controladorDetallePedido = require('../controladores/ControladorDetallePedido');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();

//Para listar
rutas.get('/',controladorimpresion.Iniciodetallepedido);
rutas.get('/listar',passport.ValidarAutendicado,controladorDetallePedido.Listar);
rutas.get('/listar2',passport.ValidarAutendicado,controladorDetallePedido.Listar2);
rutas.get('/listar3',passport.ValidarAutendicado,controladorDetallePedido.Listar3);
rutas.get('/listar4',passport.ValidarAutendicado,controladorDetallePedido.Listarmodificar);
rutas.get('/listar5',passport.ValidarAutendicado,controladorDetallePedido.Listaridregistro);

//Para guardar
rutas.post('/guardar',
body('NumeroPedido')
.notEmpty().withMessage('Debe Escribir un Número de Pedido')
.isInt().withMessage('El Numero de Pedido debe ser un numero entero'),
body('CodigoProducto')
.notEmpty().withMessage('Debe escribir un código de producto')
.isLength({min:15}).withMessage('El codigo del producto debe ser de 15 caracteres'),
body('Cantidad')
.notEmpty().withMessage('Debe ingresar la cantidad del producto')
.isInt().withMessage('El Numero de cantidad debe ser un numero entero'),
body('Cancelado')
.notEmpty().withMessage('Debe ingresar si el pedido ha sido cancelado o no').isBoolean().withMessage('Debe ser booleano'),
body('Elaborado')
.notEmpty().withMessage('Debe completar el campo de Elaboración').isBoolean().withMessage('Debe ser booleano'),
body('Entregado')
.notEmpty().withMessage('Debe completar el campo de Entregado').isBoolean().withMessage('Debe ser booleano'),
body('Facturado')
.notEmpty().withMessage('Debe de Ingresar el facturado').isBoolean().withMessage('Debe ser booleano'),
body('subproducto')
.notEmpty().withMessage('Debe completar el campo de subproducto')
.isInt().withMessage('El subproducto debe ser un entero'),
controladorDetallePedido.Guardar);

//Para Modificar
rutas.put('/modificar',
query('idregistro').notEmpty().withMessage('Debe escribir el id del registro')
.isInt().withMessage('El id del registro debe ser un numero entero'),
body('NumeroPedido')
.notEmpty().withMessage('Debe Escribir un Número de Pedido')
.isInt().withMessage('El Numero de Pedido debe ser un numero entero'),
body('CodigoProducto')
.notEmpty().withMessage('Debe escribir un código de producto')
.isLength({min:15}).withMessage('El codigo del producto debe ser de 15 caracteres'),
body('Cantidad')
.notEmpty().withMessage('Debe ingresar la cantidad del producto')
.isInt().withMessage('El Numero de cantidad debe ser un numero entero'),
body('Cancelado')
.notEmpty().withMessage('Debe ingresar si el pedido ha sido cancelado o no').isBoolean().withMessage('Debe ser booleano'),
body('Elaborado')
.notEmpty().withMessage('Debe completar el campo de Elaboración').isBoolean().withMessage('Debe ser booleano'),
body('Entregado')
.notEmpty().withMessage('Debe completar el campo de Entregado').isBoolean().withMessage('Debe ser booleano'),
body('Facturado')
.notEmpty().withMessage('Debe de Ingresar el facturador').isBoolean().withMessage('Debe ser booleano'),
body('subproducto')
.notEmpty().withMessage('Debe completar el campo de subproducto')
.isInt().withMessage('El subproducto debe ser un entero'),
controladorDetallePedido.Modificar);

//Para Eliminar
rutas.delete('/eliminar', controladorDetallePedido.Eliminar);

//Para cancelar pedido
rutas.put('/cancelar_pedido',
query('idregistro').notEmpty().withMessage('Debe escribir el id del registro').isInt().withMessage('El id del registro debe ser un numero entero'),
body('NumeroPedido').notEmpty().withMessage('Debe Escribir un Número de Pedido').isInt().withMessage('El Numero de Pedido debe ser un numero entero'),
body('Cancelado').notEmpty().withMessage('Debe ingresar si el pedido ha sido cancelado o no').isBoolean().withMessage('Debe ser booleano'),
body('usuario').notEmpty().withMessage('Debe escribir una id de usuario').isInt().withMessage('La id del usuario debe ser un numero entero'),
controladorDetallePedido.ModificarCancelado);

//Para Establecer que se elaboro el pedido
rutas.put('/pedido_elaborado',
query('idregistro').notEmpty().withMessage('Debe escribir el id del registro').isInt().withMessage('El id del registro debe ser un numero entero'),
body('NumeroPedido').notEmpty().withMessage('Debe Escribir un Número de Pedido').isInt().withMessage('El Numero de Pedido debe ser un numero entero'),
body('Elaborado').notEmpty().withMessage('Debe completar el campo de Elaboración').isBoolean().withMessage('Debe ser booleano'),
body('usuario').notEmpty().withMessage('Debe escribir una id de usuario').isInt().withMessage('La id del usuario debe ser un numero entero'),
controladorDetallePedido.ModificarElaborado);

//Para Establecer que se entrego el pedido
rutas.put('/pedido_entregado',
query('idregistro').notEmpty().withMessage('Debe escribir el id del registro').isInt().withMessage('El id del registro debe ser un numero entero'),
body('NumeroPedido').notEmpty().withMessage('Debe Escribir un Número de Pedido').isInt().withMessage('El Numero de Pedido debe ser un numero entero'),
body('Entregado').notEmpty().withMessage('Debe completar el campo de Entregado').isBoolean().withMessage('Debe ser booleano'),
body('usuario').notEmpty().withMessage('Debe escribir una id de usuario').isInt().withMessage('La id del usuario debe ser un numero entero'),
body('identrega').notEmpty().withMessage('Debe escribir una id de entrega').isInt().withMessage('La id del usuario debe ser un numero entero'),
controladorDetallePedido.ModificarEntregado);

//Para Modificar parametro de Facturado
rutas.put('/modificar_facturados',
query('idregistro').notEmpty().withMessage('Debe escribir el id del registro').isInt().withMessage('El id del registro debe ser un numero entero'),
body('NumeroPedido').notEmpty().withMessage('Debe Escribir un Número de Pedido').isInt().withMessage('El Numero de Pedido debe ser un numero entero'),
body('Facturado').notEmpty().withMessage('Debe de Ingresar el facturador').isBoolean().withMessage('Debe ser booleano'),
controladorDetallePedido.ModificarFacturado);

module.exports = rutas;