const{validationResult} = require('express-validator');
const ModeloDetallePedido = require('../modelos/ModeloDetallePedido');
const ModeloPedido = require('../modelos/ModeloPedidos');
const MSJ = require('../componentes/mensaje')
//PARA GUARDAR
exports.Guardar = async(req,res)=>{
    const validaciones = validationResult(req);
    const {NumeroPedido, CodigoProducto, Cantidad, Cancelado, Notas, Elaborado, Entregado, Facturador, subproducto} = req.body;

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
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.paramentro=element.param;
            errores.push(error);
        });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj);
    }else{
        try {
            const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                where:{
                    NumeroPedido: NumeroPedido
                }
            });

            if(buscarNumeroPedidoExistente){
                msj.estado = 'Precaucion'
                msj.mensaje = 'No existe el número del Pedido';
            }
            
            else{
                await ModeloDetallePedido.create({
                    NumeroPedido: NumeroPedido,
                    CodigoProducto: CodigoProducto,
                    Cantidad: Cantidad,
                    Cancelado: Cancelado,
                    Notas: Notas,
                    Elaborado: Elaborado,
                    Entregado: Entregado,
                    Facturador: Facturador,
                    subproducto: subproducto
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
        catch(error){
            console.error(error);
            msj.mensaje='Error al guardar los datos';
            MSJ(res,500, msj);
        }
    }

};

class CLerror {
    mensaje='';
    paramentro='';
  }

// guardar pedidos

exports.Guardar= async (req,res)=>{
    const validaciones = validationResult(req);
    const { idmesero, fechahora, Estacion, activo, modalidad, estado, NumeroPedido} = req.body;
    const {CodigoProducto, Cantidad, Cancelado, Notas, Elaborado, Entregado, Facturador, subproducto} = req.body;
    var errores = [];

    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        razon:'',
        errores:''
    }

    var msj2 = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        razon:'',
        errores:''
    }
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
                await ModeloPedidos.create({
                    idmesero: idmesero,
                    fechahora: fechahora,
                    Estacion: Estacion,
                    activo: activo,
                    modalidad: modalidad,
                    estado: estado
                })
                .then((data)=>{
                    msj.datos=data;
                })
                .catch((er)=>{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.errores= er;
                });

                

                const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                    where:{
                        NumeroPedido: NumeroPedido
                    }
                });
                await ModeloDetallePedido.create({
                    NumeroPedido: NumeroPedido,
                    CodigoProducto: CodigoProducto,
                    Cantidad: Cantidad,
                    Cancelado: Cancelado,
                    Notas: Notas,
                    Elaborado: Elaborado,
                    Entregado: Entregado,
                    Facturador: Facturador,
                    subproducto: subproducto
                })
                .then((data)=>{
                    msj2.datos=data;
                })
                .catch((er)=>{
                    msj2.estado='precaucion';
                    msj2.mensaje = 'La peticion no se ejecuto';
                    msj2.errores= er;
                });
                






                MSJ(res,200, msj);
        } catch (error) {
            console.error(error);
            msj.mensaje='Error al guardar los datos';
            MSJ(res,500, msj);
        }
    }
};
