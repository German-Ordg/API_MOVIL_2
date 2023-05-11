const { validationResult } = require('express-validator');
const Usuario = require('../../modelos/usuarios/ModeloUsuario');
const Empleado = require('../../modelos/usuarios/ModeloEmpleado');
const msjRes = require('../../componentes/mensaje');
const { Op } = require('sequelize');
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
            modulo: "Usuarios", 
            rutas: [
                {
                    ruta: "/api/usuarios",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de usuarios"
                },
                { 
                    ruta: "/api/usuarios/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los usuarios"
                },
                { 
                    ruta: "/api/usuarios/id",
                    metodo: "get",
                    parametros:{
                        id: "Identificador del usuario de tipo entero. Obligatorio."
                    },
                    descripcion: "Lista los datos del usuario"
                },
                {   
                    ruta: "/api/usuarios/filtro",
                    metodo: "get",
                    parametros: {
                        filtro: "Nombre o apellido del empleado al que pertenese el usuario. Obligatorio."
                    },
                    descripcion: "Lista los datos del usuario que cumplen el criterio de busqueda"
                },
                {   
                    ruta: "/api/usuarios/guardar",
                    metodo: "post",
                    parametros:
                        {
                            login: "Nombre de usuario. Obligatorio",
                            correo: "Correo electrónico del usuario. Obligatorio.",
                            idempleado: "Número de identificación del empleado al que pertenece el usuario. Obligatorio.",
                            contrasena: "Contraseña de acceso con una logitud de 6 a 8 caracteres. Obligatorio.",
                            accesototal: "Valor boleano que indica que es un usuario con todos los privilegios por defecto esta en false.",
                            habilitado: "Valor boleano que indica que el usuario esta habilitado. Por defecto esta en true",
                            estado: "Indica el estado del usuario AC(activo), BL(bloqueado), IN(inactivo)",
                        },
                    descripcion: "Guarda los datos del usuario"
                },
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
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
        const lista = await Usuario.findAll({
            attributes: ['id','login','correo','estado'],
            include: {
                model: Empleado,
                attributes:['nombre', 'apellido', 'nombrecompleto'],
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
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            const buscarUsuario = await Usuario.findOne({
                attributes: ['id','login','correo','estado'],
                include: {
                    model: Empleado,
                    attributes:['nombre', 'apellido', 'nombrecompleto'],
                },
                where:{
                    id
                }
            });
            if(!buscarUsuario){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del usuario no existe',
                    parametro: 'id',
                };
            }
            else{
                msj.datos= buscarUsuario;
            }
            msjRes(res, 200, msj);
            //msj.mensaje= 'Registro guardado correctamente';
        } catch (er) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = er;
            msjRes(res, 500, msj);
        }
    }
};
exports.BuscarFiltro = async (req, res)=>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            var { filtro } = req.query;
            filtro= '%'+filtro+'%';
            const buscarUsuario = await Usuario.findAll({
                attributes: ['id','login','correo','estado'],
                include: {
                    model: Empleado,
                    attributes:['nombre', 'apellido', 'nombrecompleto'],
                    where:{
                        [Op.or]:{
                           nombre: {[Op.like]: filtro},
                           apellido: {[Op.like]: filtro},
                        }
                    }
                },
                where:{
                    [Op.or]:{
                        login: {[Op.like]: filtro},
                        correo: {[Op.like]: filtro}
                    }
                }
            });
            if(!buscarUsuario){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'No existen usuarios con estos parametros',
                    parametro: 'filtro',
                };
            }
            else{
                msj.datos=buscarUsuario;
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
exports.Guardar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const {login, correo, idempleado } = req.body;
            const buscarLogin = Usuario.findOne({
                where:{
                    login
                }
            });
            if(buscarLogin){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El nombre del usuario ya existe',
                    parametro: 'login',
                };
            }
            else{
                const buscarCorreo = Usuario.findOne({
                    where:{
                        correo
                    }
                });
                if(buscarCorreo){
                    msj.estado = 'precaucion';
                    msj.mensaje = 'La peticion se ejecuto correctamente';
                    msj.errores={
                        mensaje: 'El correo del usuario ya existe',
                        parametro: 'login',
                    };
                }
                else{
                    const buscarIdEmpleado = Empleado.findOne({
                        where:{
                            idregistro: idempleado
                        }
                    });
                    if(!buscarIdEmpleado){
                        msj.estado = 'precaucion';
                        msj.mensaje = 'La peticion se ejecuto correctamente';
                        msj.errores={
                            mensaje: 'El id del empleado no existe',
                            parametro: 'idempleado',
                        };
                    }
                    else{
                        await Usuario.create({
                            ...req.body,
                        })
                        .then((data)=>{
                            msj.datos=data;
                        })
                        .catch((er)=>{
                            msj.estado = 'error';
                            msj.mensaje = 'La peticion no se ejecuto';
                            msj.errores = er.parent.sqlMessage;
                        });
                    }  
                }
            }
            msjRes(res, 200, msj);
            //msj.mensaje= 'Registro guardado correctamente';
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};