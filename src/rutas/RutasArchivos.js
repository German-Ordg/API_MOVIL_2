const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorArchivos = require('../controladores/ControladorArchivos');
const storageProductos = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/img/productos'));
    },
    filename: function (req, file, cb){
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/','.'));
    }
});
const uploadproducto = multer({storage: storageProductos});

const rutas = Router();
rutas.post('/productos/img', uploadproducto.single('img'), controladorArchivos.Recibir);


//usuario

const storageUsuario = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/img/empleados'));
    },
    filename: function (req, file, cb){
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/','.'));
    }
});
const uploadusuario = multer({storage: storageUsuario});


rutas.post('/usuario/img', uploadusuario.single('img'), controladorArchivos.Recibirusuario);


module.exports = rutas;