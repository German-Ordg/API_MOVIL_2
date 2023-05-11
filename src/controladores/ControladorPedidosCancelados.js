const{validationResult} = require('express-validator'); 

const modeloPedidosCancelados = require('../modelos/ModeloPedidosCancelados');
const MODELOdetallePedido = require('../modelos/ModeloDetallePedido');
const ModeloUsuario = require('../modelos/ModeloUsuario');
const MSJ = require('../componentes/mensaje')

exports.Listar= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        const lista = await modeloPedidosCancelados.findAll();
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
    const {numeropedido, usuario,  fechahora} = req.body;

    try 
    {
        var errores = [];
        var error = {
            mensaje: '',
            razon:'',
            paramentro: ''
        };
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
        
        const buscarentregapedido = await  modeloPedidosCancelados.findOne({
            where:{
                numeropedido: numeropedido
            }
        });
        const buscarpedido = await  MODELOdetallePedido.findOne({
            where:{
                idregistro: numeropedido
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
                msj.razon = 'este pedido ya fue cancelado'
            }else
            if(!buscarpedido){
                msj.razon = 'este detalle de pedido no existe'
            }else
            if(!buscarusuario){
                msj.razon = 'no existe el id del usuario. ';
            }else{
                await modeloPedidosCancelados.create({
                    numeropedido: numeropedido,
                    usuario: usuario,
                    fechahora: fechahora,
                    
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