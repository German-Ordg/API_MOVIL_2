const { validationResult } = require('express-validator');
const Cargo = require('../../modelos/usuarios/ModeloCargo');
const Empleado = require('../../modelos/usuarios/ModeloEmpleado');
const Usuario = require('../../modelos/usuarios/ModeloUsuario');
const { Op } = require('sequelize');
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
            modulo: "Empleados", 
            rutas: [
                {
                    ruta: "/api/empleados",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de empleados"
                },
                { 
                    ruta: "/api/empleados/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los empleados"
                },
                { 
                    ruta: "/api/empleados/id",
                    metodo: "get",
                    parametros:{
                        id: "Identificador del empleado este es de tipo entero. Obligatorio."
                    },
                    descripcion: "Lista los datos del empleado"
                },
                {   
                    ruta: "/api/empleados/filtro",
                    metodo: "get",
                    parametros: {
                        filtro: "Nombre o apellido del empleado al que pertenese el usuario. Obligatorio."
                    },
                    descripcion: "Lista los datos del empleado que cumplen el criterio de busqueda"
                },
                {   
                    ruta: "/api/empleados/guardar",
                    metodo: "post",
                    parametros:
                        {
                            nombre: "Nombre del empleado. Obligatorio",
                            apellido: "Apellido del empleado. Obligatorio.",
                            identidad: "Número de identificación nacional del empleado. Obligatorio.",
                            idcargo: "Numero de identificacion del cargo. Obligatorio.",
                            salario: "Salario del empleado por defecto esta en cero.",
                            fechaingreso: "Fecha de ingreso a laborar en la empreso. Por defecto esta en la fecha de resgistro",
                        },
                    descripcion: "Guarda los datos del empleado"
                },
                {   
                    ruta: "/api/empleados/modificar",
                    metodo: "put",
                    parametros:
                        {
                            id: "Numero de identificación del empleado",
                            nombre: "Nombre del empleado. Obligatorio",
                            apellido: "Apellido del empleado. Obligatorio.",
                            identidad: "Número de identificación nacional del empleado. Obligatorio.",
                            idcargo: "Numero de identificacion del cargo. Obligatorio.",
                            salario: "Salario del empleado por defecto esta en cero.",
                            fechaingreso: "Fecha de ingreso a laborar en la empreso. Por defecto esta en la fecha de resgistro",
                        },
                    descripcion: "Modifica los datos del empleado"
                },
                {   
                    ruta: "/api/empleados/eliminar",
                    metodo: "id",
                    parametros:
                        {
                            id: "Numero de identificación del empleado",
                        },
                    descripcion: "Elimina el empleado"
                },
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de gestion de restaurantes",
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
        const lista = await Empleado.findAll({
            attributes: ['id','identidad','nombre','apellido', 'nombrecompleto'],
            include: {
                model: Cargo,
                attributes:['nombre'],
            },
        });
        msj.datos= lista;
        msjRes(res, 200, msj);
    } catch (error) {
        console.error(error);
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        msjRes(res, 500, msj);
    }
};

exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);
    const { id } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const lista = await Empleado.findAll({
                include: {
                    model: Cargo,
                    attributes:['nombre'],
                },
                where:{
                    id
                }
            });
            if (lista.length==0){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del empleado no existe',
                    parametro: 'id',
                };
            }
            else{
                console.log(JSON.stringify(lista, null, ' '));
                msj.datos= lista;
            }
            msjRes(res, 200, msj);
        } catch (error) {
            console.error(error);
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }        
};

exports.BuscarFiltro = async (req, res)=>{
    var msj = validacion(req);
    const { id } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const filtro = '%' + req.query.filtro + '%';
        const limite = req.query.limite;
        try {
            const lista = await Empleado.findAll({
                include: {
                    model: Cargo,
                    attributes:['nombre'],
                },
                where:{
                    [Op.or]:[
                        {identidad: {[Op.like]: filtro}},
                        {nombre: {[Op.like]: filtro}},
                        {apellido: {[Op.like]: filtro}}
                    ]
                },
                limit: 10,
            });
            if (lista.length==0){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'No existe ningun empleado con esta informacion',
                    parametro: 'filtro',
                };
            }
            else{
                console.log(JSON.stringify(lista, null, ' '));
                msj.datos= lista;
            }
            msjRes(res, 200, msj);
        } catch (error) {
            console.error(error);
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }        
};

exports.Guardar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const {nombre, apellido, identidad, idcargo } = req.body;
        try {
            const buscarIdentidad = await Empleado.findOne({where:{NumeroIdentidad: identidad}});
            if(buscarIdentidad){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El numero de identidad ya existe',
                    parametro: 'identidad',
                };
                msjRes(res, 200, msj);
            }
            else {
                const buscarCargo = await Cargo.findOne({where:{id: idcargo}});
                if(!buscarCargo){
                    msj.estado = 'precaucion';
                    msj.mensaje = 'La peticion se ejecuto correctamente';
                    msj.errores={
                        mensaje: 'El id del cargo no existe',
                        parametro: 'idcargo',
                    };
                    msjRes(res, 200, msj);
                }
                else{
                    await Empleado.create({
                        ...req.body,
                    })
                    .then((data)=>{
                        msj.datos=data;
                        msjRes(res, 200, msj);
                    })
                    .catch((er)=>{
                        msj.estado = 'error';
                        msj.mensaje = 'La peticion no se ejecuto';
                        msj.errores = er.parent.sqlMessage;
                        msjRes(res, 500, msj);
                    });
                }
            }
        } 
        catch (er) {
            console.error(er);
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = er;
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
            var buscarEmpleado = await Empleado.findByPk(id);
            if(!buscarEmpleado){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del empleado no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{

                
                await Empleado.update(
                    {...req.body},
                    { where:{id: id}})
                    .then((data) => {
                        msj.datos=data;
                        msjRes(res, 200, msj);
                    })
                    .catch((er)=>{
                        msj.estado = 'error';
                        msj.mensaje = 'La peticion no se ejecuto';
                        msj.errores = er.parent.sqlMessage;
                        msjRes(res, 500, msj);
                    }
                );
            }
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
            var buscarEmpleado = await Empleado.findByPk(id);
            if(!buscarEmpleado){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del empleado no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{
                const buscarUsuario = await Usuario.findOne({where:{idempleado: id}});
                if(buscarUsuario){
                    msj.estado = 'precaucion';
                    msj.mensaje = 'La peticion se ejecuto correctamente';
                    msj.errores={
                        mensaje: 'El id del empleado esta vinculado con un usuario no se permite la eliminacion',
                        parametro: 'id',
                    };
                    msjRes(res, 200, msj);
                }
                else{
                    await Empleado.destroy(
                        { where:{id: id}})
                        .then((data) => {
                            msj.datos=data;
                            msjRes(res, 200, msj);
                        })
                        .catch((er)=>{
                            msj.estado = 'error';
                            msj.mensaje = 'La peticion no se ejecuto';
                            msj.errores = er.parent.sqlMessage;
                            msjRes(res, 500, msj);
                        });
                }
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};