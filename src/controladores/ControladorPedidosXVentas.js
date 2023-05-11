const{validationResult} = require('express-validator'); //ponemos donde vamos hacer la validacion
const ModeloPedidosXVentas = require('../modelos/ModeloPedidosXVentas');
const ModeloPedidos = require('../modelos/ModeloPedidos');
const msjRes = require('../componentes/mensaje');

//PARA LISTAR
exports.Listar= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        const lista = await ModeloPedidosXVentas.findAll();
        msj.estado='correcto';
        msj.mensaje= 'Peticion ejecutada correctamente. ';
        msj.datos=lista;
        msjRes(res,200,msj);
    } catch (error) {
        msj.estado='error';
        msj.errores=error;
        msj.mensaje='Error al leer los datos';
        msjRes(res,500,msj);
    }
};

//CLASE PARA ERRORES
class CLerror {
    mensaje='';
    paramentro='';
  }

//CLASE PARA GUARDAR
exports.Guardar= async (req,res)=>{
    const validaciones = validationResult(req);
    const { NumeroFactura,NumeroPedido} = req.body;
    var errores = [];
    var msj = {
        estado:'correcto',
        razon:'',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    const buscarmodelopedido = await  ModeloPedidos.findOne({
        where:{
            NumeroPedido: NumeroPedido
        }
    });
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            const p = new CLerror();
            p.mensaje=element.msg;
            p.paramentro=element.param;
            errores.push(p);
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = errores;
        msjRes(res,200,msj);
    }else{
        try {
            if(!buscarmodelopedido){
                msj.razon = 'no existe el id del pedido. ';
            }else 
            {
                await ModeloPedidosXVentas.create({
                    NumeroFactura: NumeroFactura,
                    NumeroPedido: NumeroPedido
                })
                .then((data)=>{
                    msj.datos=data;
                })
            }
                msj.estado='correcto';
                    msj.mensaje= 'Peticion ejecutada correctamente. ';
                msjRes(res,200,msj);
            
            
        } catch (error) {
            console.error(error); 
            msj.estado='error';
            msj.mensaje='Error al guardar los datos';
            msj.errores=error;
            msjRes(res,500,msj);
        }
    }
};