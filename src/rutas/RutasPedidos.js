const { Router } = require('express');
const {body , query }= require('express-validator');
const controladorPedidos =require('../controladores/ControladorPedidos');
const controladorimpresion = require('../controladores/ControladorPedidosInicio');
const passport = require('../configuraciones/passport');
const rutas = Router();

rutas.get('/',controladorimpresion.Iniciopedido);
rutas.get('/listar',passport.ValidarAutendicado,controladorPedidos.Listar);

rutas.post('/guardar',
body('idmesero').isLength({min: 1},{max: 3}).withMessage('Debe escribir la identidad del mesero').isInt().withMessage('el idmesero debe de ser un numero'),
body('Estacion').notEmpty().withMessage('Debe ingresar la estacion').isInt().withMessage('la estacion debe de ser un numero'),
body('activo').notEmpty().withMessage('Debe escribir si esta activo').isBoolean().withMessage('Debe ser booleano'),
body('modalidad').notEmpty().withMessage('Debe escribir un enumerado'),
body('estado').notEmpty().withMessage('Debe escribir un enumerado'),
controladorPedidos.Guardar);

rutas.put('/modificar',
query('NumeroPedido').notEmpty().withMessage('Debe escribir el id del pedido')
.isInt().withMessage('El id del pedido debe ser un numero entero'),
body('idmesero').isLength({min: 1},{max: 3}).withMessage('Debe escribir la identidad del mesero'),
body('Estacion').notEmpty().withMessage('Debe ingresar la estacion').isInt().withMessage('la estacion debe de ser un numero'),
body('activo').notEmpty().withMessage('Debe escribir si esta activo').isBoolean().withMessage('Debe ser booleano'),
body('modalidad').notEmpty().withMessage('Debe escribir la modalidad'),
body('estado').notEmpty().withMessage('Debe escribir el estado'),
controladorPedidos.Modificar);

module.exports = rutas; 