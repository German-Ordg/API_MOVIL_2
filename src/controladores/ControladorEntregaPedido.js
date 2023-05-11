const{validationResult} = require('express-validator'); 

const MODELOentregaPedido = require('../modelos/ModeloEntregaPedido');
const MODELOdetallePedido = require('../modelos/ModeloDetallePedido');
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
        const lista = await MODELOentregaPedido.findAll();
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

class CLerror {
    mensaje='';
    paramentro='';
  }
exports.Guardar= async (req,res)=>{
    const validaciones = validationResult(req);
    const {iddetalle_pedido, usuario,  fechahora, identrega} = req.body;

    try 
    {
        var errores = [];

        var msj = {
            estado:'correcto',
            mensaje: 'Peticion ejecutada correctamente. ',
            datos:'',
            razon:'',
            errores:''
        }

        const buscarusuario = await  ModeloUsuario.findOne({
            where:{
                idregistro: usuario
            }
        });
        // se busca si ya fue ingresado este dato para que no tire error
        const buscarentregapedido = await  MODELOentregaPedido.findOne({
            where:{
                iddetalle_pedido: iddetalle_pedido
            }
        });
        //se mira que ese detale pedido exista en la tabla de detalle pedido
        const buscarpedido = await  MODELOdetallePedido.findOne({
            where:{
                idregistro: iddetalle_pedido
            }
        });
        if(validaciones.errors.length > 0){
            validaciones.errors.forEach(element => {
                const p = new CLerror();
                p.mensaje = element.msg;
                p.paramentro=element.param;
                errores.push(p);
            });
            msj.estado='precaucion';
            msj.mensaje='la peticion no se ejecuto. '
            msj.errores=errores;
            
            MSJ(res,200, msj);
        }else{
            if(buscarentregapedido){
                msj.razon = 'este pedido ya fue entregado'
            }else
            if(!buscarpedido){
                msj.razon = 'este detalle de pedido no existe'
            }else
            if(!buscarusuario){
                msj.razon = 'no existe el id del usuario. ';
            }else 
            {
                await MODELOentregaPedido.create({
                    iddetalle_pedido: iddetalle_pedido,
                    usuario: usuario,
                    fechahora: fechahora,
                    identrega: identrega
                })
                .then((data)=>{
                    msj.datos=data;
                })
                .catch((er)=>{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.errores= er;
                });
            }
            
            
            MSJ(res,200, msj);
        } 
    }catch (er) {
        console.error(er);
        msj.estado='error';
        msj.mensaje='La peticion no se guardo';
        msj.errores = er;
        MSJ(res,500, msj);
    }
};