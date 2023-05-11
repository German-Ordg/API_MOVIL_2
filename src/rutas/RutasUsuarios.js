const{Router} = require('express');
const{body, query} = require('express-validator'); //ponemos donde vamos hacer la validacion
const controladorUsuario = require('../controladores/ControladorUsuarios');
const rutas = Router();
rutas.get('/listar',controladorUsuario.Listar);
rutas.post('/guardar',
body('LoginUsuario')
.notEmpty().withMessage('debe escribir un login')
.isLength({min: 3}).withMessage('debe escribir un login de almenos 3 caracteres') ,
body('empleado')
.notEmpty().withMessage('Debe escribir una id de empleado')
.isInt().withMessage('La id del empleado debe ser un numero entero'),
body('contrasena')
.notEmpty().withMessage('Debe escribir una contraseña')
.isLength({min: 8}).withMessage('La contraseña debe tener minimo 8 caracteres'),
body('AccesoTotal')
.notEmpty().withMessage('Debe escribir un acceso total de empleado')
.isInt().withMessage('el acceso total del empleado debe ser un numero entero'),
body('habilitado')
.notEmpty().withMessage('Debe escribir un habilitado de empleado')
.isInt().withMessage('El habilitado de usuario debe ser un numero entero'),
controladorUsuario.Guardar);
module.exports = rutas;