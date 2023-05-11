const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuario = require('../../controladores/usuarios/ControladorUsuarios');
const passport = require('../../configuraciones/passport');
const rutas = Router();
rutas.get('/', controladorUsuario.Inicio);
rutas.get('/listar', passport.ValidarAutendicado, controladorUsuario.Listar);
rutas.get('/id', passport.ValidarAutendicado,
query('id').notEmpty().withMessage('Debe escribir el id del usuario')
.isInt().withMessage('El id del usuario debe ser un numero entero'), 
controladorUsuario.BuscarId);
rutas.get('/filtro', passport.ValidarAutendicado,
query('filtro')
.notEmpty().withMessage('Debe escribir el filtro de usuario')
.isLength({min: 3}).withMessage('Debe escribir un filtro de 3 caracteres como mínimo'),
controladorUsuario.BuscarFiltro);
rutas.post('/guardar', passport.ValidarAutendicado,
body('login')
.notEmpty().withMessage('Debe escribir el nombre de usuario')
.isLength({min: 3}).withMessage('Debe escribir un nombre de 3 caracteres como mínimo'),
body('contrasena')
.notEmpty().withMessage('Debe escribir la contraseña de usuario')
.isLength({min: 6, max: 12}).withMessage('Debe escribir una contraseña de 6 - 12 caracteres'),
body('correo')
.notEmpty().withMessage('Debe escribir un correo')
.isEmail().withMessage('Debe escribir una dirección de correo electrónico válido'),
body('idempleado').notEmpty().withMessage('Debe escribir el id del empleado')
.isInt().withMessage('El id del empleado debe ser un número entero'),
controladorUsuario.Guardar);
module.exports = rutas;