const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCargos = require('../../controladores/usuarios/ControladorCargos');
const rutas = Router();
rutas.get('/', controladorCargos.Inicio);
rutas.get('/listar', controladorCargos.Listar);
rutas.post('/guardar', 
//body('usuario').isLength({min: 3}).withMessage('Debe escribir el nombre de usuario'),
body('nombre')
.notEmpty().withMessage('Debe escribir el nombre del cargo')
.isLength({min: 3}).withMessage('Debe escribir un nombre de 3 caracteres como mínimo'),
controladorCargos.Guardar);

rutas.put('/modificar', 
query('id').notEmpty().withMessage('Debe escribir el id del cargo')
.isInt().withMessage('El id del cargo debe ser un numero entero'),
body('nombre')
.notEmpty().withMessage('Debe escribir el nombre del cargo')
.isLength({min: 3}).withMessage('Debe escribir un nombre de cargo de 3 caracteres como mínimo'),
controladorCargos.Modificar);

rutas.delete('/eliminar', 
query('id').notEmpty().withMessage('Debe escribir el id de usuario')
.isInt().withMessage('El id del usuario debe ser un numero entero'),
controladorCargos.Eliminar);

module.exports = rutas;