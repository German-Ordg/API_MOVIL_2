const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../../controladores/usuarios/ControladorEmpleados');
const passport = require('../../configuraciones/passport');
const rutas = Router();
rutas.get('/', controladorEmpleados.Inicio);
rutas.get('/listar', passport.ValidarAutendicado, controladorEmpleados.Listar);

rutas.get('/id', 
query('id').notEmpty().withMessage('Debe escribir el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
controladorEmpleados.BuscarId);

rutas.get('/filtro', 
query('filtro')
.notEmpty().withMessage('Debe escribir el filtro de busqueda del empleado')
.isLength({min: 3}).withMessage('Debe escribir un filtro de 3 caracteres como mínimo'),
controladorEmpleados.BuscarFiltro);

rutas.post('/guardar', 
//body('usuario').isLength({min: 3}).withMessage('Debe escribir el nombre de usuario'),
body('nombre')
.notEmpty().withMessage('Debe escribir el nombre del empleado')
.isLength({min: 3}).withMessage('Debe escribir un nombre de 3 caracteres como mínimo'),
body('apellido')
.notEmpty().withMessage('Debe escribir el apellido del empleado')
.isLength({min: 3}).withMessage('Debe escribir un apellido de 3 caracteres como mínimo'),
body('identidad')
.notEmpty().withMessage('Debe escribir el numero de identidad del empleado')
.isLength({min:10, max:15}).withMessage('El numero de identidad debe tener 15 caracteres')
.isAlphanumeric().withMessage('Solo se aceptan digitos para el numero de identidad'),
body('idcargo').notEmpty().withMessage('Debe escribir el id del cargo del empleado')
.isInt().withMessage('El id del cargo debe ser un número entero'),
body('salario')
.isDecimal().withMessage('El salario debe ser un número decimal'),
controladorEmpleados.Guardar);

rutas.put('/modificar', 
query('id').notEmpty().withMessage('Debe escribir el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
body('nombre')
.notEmpty().withMessage('Debe escribir el nombre del empleado')
.isLength({min: 3}).withMessage('Debe escribir un nombre de 3 caracteres como mínimo'),
body('apellido')
.notEmpty().withMessage('Debe escribir el apellido del empleado')
.isLength({min: 3}).withMessage('Debe escribir un apellido de 3 caracteres como mínimo'),
body('identidad')
.notEmpty().withMessage('Debe escribir el numero de identidad del empleado')
.isLength(15).withMessage('El numero de identidad debe tener 15 caracteres')
.isAlphanumeric().withMessage('Solo se aceptan digitos para el numero de identidad'),
body('idcargo').notEmpty().withMessage('Debe escribir el id del cargo del empleado')
.isInt().withMessage('El id del cargo debe ser un número entero'),
body('salario')
.isDecimal().withMessage('El salario debe ser un número decimal'),
controladorEmpleados.Modificar);

rutas.delete('/eliminar', 
query('id').notEmpty().withMessage('Debe escribir el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
controladorEmpleados.Eliminar);

module.exports = rutas;