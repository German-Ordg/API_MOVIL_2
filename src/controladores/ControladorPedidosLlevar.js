const{validationResult} = require('express-validator'); 

const ModeloPedidosLlevar = require('../modelos/ModeloPedidosLlevar');
const ModeloPedido = require('../modelos/ModeloPedidos');
//const ModeloCliente = require('../modelos/ModeloCliente')
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
        const lista = await ModeloPedidosLlevar.findAll();
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
    const {idpedido,  idcliente} = req.body;

        var errores = [];
        var msj = {
            estado:'correcto',
            mensaje: 'Peticion ejecutada correctamente. ',
            datos:'',
            razon:'',
            errores:''
        }
        /*const buscarcliente = await ModeloCliente.findOne({
            where:{
                idcliente: idcliente
            }
        });*/

        const buscarmodelopedido = await  ModeloPedido.findOne({
            where:{
                NumeroPedido: idpedido
            }
        });
        if(validaciones.errors.length > 0){
            validaciones.errors.forEach(element => {
                const p = new CLerror();
                p.mensaje=element.msg;
                p.paramentro=element.param;
                errores.push(p);
            });
            msj.estado='precaucion';
            msj.mensaje='la peticion no se ejecuto. '
            msj.errores=errores;
            
            MSJ(res,200, msj);
        }else{
            try {
            /*if(!buscarcliente){
                msj.razon = 'el id de cliente no existe. ';
            }
            else */
            if(!buscarmodelopedido){
                msj.razon = 'no existe el id del pedido. ';
            }else 
            {
                await ModeloPedidosLlevar.create({
                    idpedido: idpedido,
                    idcliente: idcliente,
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
    }catch (er) {
        console.error(er);
        msj.estado='error';
        msj.mensaje='La peticion no se guardo';
        msj.errores = er;
        MSJ(res,500, msj);
    }
}
};
