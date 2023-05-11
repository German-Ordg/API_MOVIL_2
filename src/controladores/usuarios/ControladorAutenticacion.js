const { validationResult } = require('express-validator');
const Usuario = require('../../modelos/ModeloUsuario');
const { Op } = require('sequelize');
const msjRes = require('../../componentes/mensaje');
const EnviarCorreo = require('../../configuraciones/correo');
const gpc = require('generate-pincode');
const passport = require('../../configuraciones/passport');
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
            modulo: "Autenticación", 
            rutas: [
                {
                    ruta: "/api/autenticacion",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de autenticación"
                },
                { 
                    ruta: "/api/autenticacion/pin",
                    metodo: "post",
                    parametros:{
                        correo: "Correo electronico del usuario, al que se le enviara un correo con el pin. Obligatorio."
                    },
                    descripcion: "Envio de pin de recuperación de contraseña al correo electrónico."
                },
                {   
                    ruta: "/api/autenticacion/recuperarcontrasena",
                    metodo: "put",
                    parametros: {
                        usuario: "login o correo del usuario. Obligatorio.",
                        pin: "Pin enviado al correo del usuario. Obligatorio.",
                        contrasena: "Nueva contrasena de usuario. Obligatorio.",
                    },
                    descripcion: "Actualiza la contraseña del usuario"
                },
                {   
                    ruta: "/api/autenticacion/iniciosesion",
                    metodo: "post",
                    parametros:
                        {
                            usuario: "Login o correo de usuario. Obligatorio",
                            contrasena: "Contraseña del usuario. Obligatorio.",
                        },
                    descripcion: "Genera el token para poder acceder a las rutas del usuario"
                },
            ],
        }          
    ];
    const datos = {
        api: "API-SIGRES",
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
exports.Pin = async (req, res) =>{
    var msj = validacion(req);
    if(msj.errores.length>0){
        msjRes(res, 200, msj);
    }
    else{
        const { correo } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where:{
                correo: correo
            }
        });
        if(!buscarUsuario){
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = [
                {
                    mensaje: "El correo no exite o no esta vinculado con ningun usuario",
                    parametro: "correo"
                },
            ];
            msjRes(res, 200, msj);
        }
        else{
            const pin = gpc(4);
            buscarUsuario.pin=pin;
            await buscarUsuario.save();
            const data = {
                correo: correo,
                pin: pin
            };
            EnviarCorreo.RecuperarContrasena(data);
            msj.estado= 'correcto';
            msj.mensaje= 'Peticion ejecutada correctamente';
            msjRes(res, 200, msj);
        }
    }
};
exports.Recuperar = async (req, res) =>{
    var msj = validacion(req);
    if(msj.errores.length>0){
        msjRes(res, 200, msj);
    }
    else{
        const { usuario } = req.query;
        const { pin, contrasena } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where:{
                [Op.or]:{
                    correo: usuario,
                    login: usuario
                },
            }
        });
        if(!buscarUsuario){
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = [
                {
                    mensaje: "El correo o login no exite",
                    parametro: "usuario"
                },
            ];
            msjRes(res, 200, msj);
        }
        else{
            if(pin==buscarUsuario.pin){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion no se ejecuto';
                msj.errores = [
                    {
                        mensaje: "El pin es incorrecto o ha expirado",
                        parametro: "pin"
                    },
                ];
                msjRes(res, 200, msj);
            }
            else{
                buscarUsuario.contrasena=contrasena;
                buscarUsuario.estado='AC';
                buscarUsuario.fallidos=0;
                await buscarUsuario.save()
                .then((data) => {
                    msj.estado= 'correcto';
                msj.mensaje= 'Peticion ejecutada correctamente';
                msjRes(res, 200, msj);
                })
                .catch((error)=>{
                    msj.estado= 'error';
                    msj.mensaje= 'Peticion no ejecutada';
                    msj.errores=error;
                    msjRes(res, 500, msj);
                });
            }
        }
    }
};

exports.Error = async (req, res) =>{
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    msj.estado = 'error';
    msj.mensaje = 'La peticion no se ejecuto';
    msj.errores = [
        {
            mensaje: "Debe enviar las credenciales",
            parametro: "autenticacion"
        },
    ];
    msjRes(res, 200, msj);
};

exports.InicioSesion = async(req, res) =>{
    var msj = validacion(req);
    if(msj.errores.length>0){
        msjRes(res,200,msj);
    }
    else{
        const { LoginUsuario,Contrasena } =req.body;
        const buscarUsuario = await Usuario.findOne({
            where:{
                [Op.or] : {
                    LoginUsuario: LoginUsuario,
                    Contrasena: Contrasena,
                },
                estado:'AC',
                Habilitado: true
                /*
                [Op.and]:[
                    {[Op.or]:[
                        {
                            [Op.like]:[{login: usuario}],
                            [Op.like]:[{correo: usuario}]
                        }
                    ],
                    estado: 'AC',
                    habilitado: true
                    }
                ]*/
            }
        }

        );
        if(!buscarUsuario){
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = [{
                mensaje:"El usuario no existe",
                paramentro:"usuario"
            },];
            msjRes(res,200,msj)
        }
        else{
            if (buscarUsuario.VerificarContrasena(Contrasena,buscarUsuario.Contrasena)){
                const token = passport.getToken({idregistro:buscarUsuario.idregistro});
                const idusuario1 = buscarUsuario.idregistro;
                const data = {
                    token:token,
                    LoginUsuario:LoginUsuario,
                    idusuario:idusuario1,
                    usuario: {
                        nombre: buscarUsuario.nombre,
                        correo: buscarUsuario.correo,
                        apellido: buscarUsuario.apellido,
                        imagen: buscarUsuario.nombreImagen
                    }

                }
                msj.estado='correcto';
                msj.mensaje= 'Peticion ejecutada correctamente. ';
                msj.datos=data;
                msjRes(res,200, msj);
            }
            else{
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion no se ejecuto';
                msj.errores = [{
                    mensaje:"El usuario no existe o la contraseña es incorrecta",
                    paramentro:"contrasena"
                },];
                msjRes(res,200,msj)
            }
        }
    }
};