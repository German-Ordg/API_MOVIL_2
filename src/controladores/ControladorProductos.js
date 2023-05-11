const res = require("express/lib/response");
const ModeloProductos = require('../modelos/ModeloProducto');
const{validationResult} = require('express-validator'); 
const MSJ = require('../componentes/mensaje')

exports.Listar= async (req,res)=>{
    var errores = [];
    var error = {
        mensaje: '',
        paramentro: ''
    };
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        const lista = await ModeloProductos.findAll();
        msj.estado='correcto';
        msj.mensaje= 'Peticion ejecutada correctamente. ';
        msj.datos=lista;
        MSJ(res,200,msj);
    } catch (error) {
        console.error(error);
        msj.mensaje='Error al leer los datos';
        MSJ(res,500,msj);
    }
};