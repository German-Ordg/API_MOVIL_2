//creado por german

const{validationResult} = require('express-validator'); //ponemos donde vamos hacer la validacion
const ModeloUsuario = require('../modelos/ModeloUsuario');
const MSJ = require('../componentes/mensaje');


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
        const lista = await ModeloUsuario.findAll();
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

exports.Guardar= async (req,res)=>{
    const validaciones = validationResult(req);
    const { LoginUsuario,empleado,  Contrasena, AccesoTotal, Habilitado, pin, fallidos, correo, estado, nombreImagen, nombre,apellido} = req.body;
    var contador=1;
    var msj = {
        mensaje:''
    }
    if(validaciones.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje+=element.msg + '. ';
        });
        //
    }else{
        try {
            const buscarloginexistente = await ModeloUsuario.findOne({
                where:{
                    LoginUsuario: LoginUsuario
                }
            });

            const buscarcorreoexistente = await ModeloUsuario.findOne({
                where:{
                    correo: correo
                }
            });



            if(buscarloginexistente){
                msj.mensaje += 'el LoginUsuario ya existe. ';
                contador=0;
            }
            else  if(buscarcorreoexistente){
                msj.mensaje += 'El correo ya existe. '
                contador=0;
            }
            else if(!pin && !fallidos && !estado ){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    correo: correo,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }else if(!pin && !fallidos){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    correo: correo,
                    estado: estado,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }else if(!pin && !estado ){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    fallidos: fallidos,
                    correo: correo,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }else if(!estado && !fallidos ){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    pin: pin,
                    correo: correo,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }else if(!pin ){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    fallidos: fallidos,
                    correo: correo,
                    estado: estado,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }else if(!fallidos){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    pin: pin,
                    correo: correo,
                    estado: estado,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }
            else if(!estado){
                await ModeloUsuario.create({
                    LoginUsuario: LoginUsuario,
                    empleado: empleado,
                    Contrasena: Contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: Habilitado,
                    pin: pin,
                    correo: correo,
                    fallidos: fallidos,
                    nombreImagen: nombreImagen,
                    nombre:nombre,
                    apellido:apellido
                })
            }
            if(contador==1){
            msj.mensaje +='Registro guardado correctamente';
            }
        } catch (error) {
            console.error(error);
            msj.mensaje='Error al guardar los datos';
        }
    }
        res.json(msj);
};
