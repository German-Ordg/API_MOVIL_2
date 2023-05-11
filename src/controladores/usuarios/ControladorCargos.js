const { validationResult } = require('express-validator');
const Cargo = require('../../modelos/usuarios/ModeloCargo');
const msjRes = require('../../componentes/mensaje');
function validacion (req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    
    if(validaciones.errors.length > 0)
    {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = errores;
        //msj.mensaje='Debe escribir todos los campos';
    }
    return msj;
};
exports.Inicio = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "Cargos", 
            rutas: [
                {
                    ruta: "/api/cargos",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de cargos"
                },
                { 
                    ruta: "/api/cargos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los cargos"
                },
                { 
                    ruta: "/api/cargos/id",
                    metodo: "get",
                    parametros:{
                        id: "Identificador del cargo de tipo entero. Obligatorio."
                    },
                    descripcion: "Lista los datos del cargo"
                },
                {   
                    ruta: "/api/cargos/guardar",
                    metodo: "post",
                    parametros:
                        {
                            nombre: "Nombre de cargo. Obligatorio",
                            descripcion: "Descripcion del cargo.",
                        },
                    descripcion: "Guarda los datos del cargo"
                },
                {   
                    ruta: "/api/cargos/modificar",
                    metodo: "post",
                    parametros:
                        {
                            nombre: "Nombre de cargo. Obligatorio",
                            descripcion: "Descripcion del cargo.",
                        },
                    descripcion: "Actualiza los datos del cargo"
                },
                {   
                    ruta: "/api/cargos/eliminar",
                    metodo: "post",
                    parametros:
                        {
                            id: "Identificador del cargo de tipo entero. Obligatorio."
                        },
                    descripcion: "Elimina los datos del cargo"
                },
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de gestión de restaurantes",
        propiedad: "DESOFIW",
        desarrollador: "Ing. Carlos Flores",
        colaboradores: "",
        fecha: "19/05/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};
exports.Listar = async (req, res)=>{
    var msj = validacion(req);
    try {
        const lista = await Cargo.findAll();
        msj.datos= lista;
        msjRes(res, 200, msj);
    } catch (error) {
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        msjRes(res, 500, msj);
    }
};
exports.Guardar = async (req, res) =>{
    var msj = validacion(req);
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const {nombre, descripcion } = req.body;
            if (!descripcion){
                await Cargo.create({
                    NombreCargo: nombre
                }); 
            }
            else{
                await Cargo.create({
                    NombreCargo: nombre,
                    DescripcionCargo: descripcion
                });
            }
            msjRes(res, 200, msj);
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};
exports.Modificar = async (req, res) =>{
    var msj = validacion(req);
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            const {nombre, descripcion } = req.body;
            var buscarCargo = await Cargo.findOne({
                where:{
                    CodigoCargo: id
                }
            });
            if(!buscarCargo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del cargo no existe',
                    parametro: 'id',
                };
            }
            else{
                if (!descripcion){
                    buscarCargo.NombreCargo=nombre;
                }
                else{
                    buscarCargo.NombreCargo=nombre;
                    buscarCargo.DescripcionCargo= descripcion;
                }
                await Cargo.save();
            }
            msjRes(res, 200, msj);
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};
exports.Eliminar = async (req, res) =>{
    var msj = validacion(req);
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            var buscarCargo = await Cargo.findOne({
                where:{
                    CodigoCargo: id
                }
            });
            if(!buscarCargo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del cargo no existe',
                    parametro: 'id',
                };
            }
            else{
                await Cargo.destroy({
                    where: {
                        CodigoCargo: id
                    }
                });
            }
            msjRes(res, 200, msj);
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};