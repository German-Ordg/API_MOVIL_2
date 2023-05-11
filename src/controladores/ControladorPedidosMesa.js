const{validationResult} = require('express-validator'); //ponemos donde vamos hacer la validacion
const ModeloPedidosMesa = require('../modelos/ModeloPedidosMesa');
const ModeloPedidos = require('../modelos/ModeloPedidos');
const msjRes = require('../componentes/mensaje');

//PARA LISTAR
exports.Listar= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        razon:'',
        datos:'',
        errores:''
    };
    try {
        const lista = await ModeloPedidosMesa.findAll();
        msj.estado='correcto';
        msj.mensaje= 'Peticion ejecutada correctamente. ';
        msj.datos=lista;
        msjRes(res,200,msj);
    } catch (error) {
        console.error(error);
        msj.mensaje='Error al leer los datos';
        msjRes(res,500,msj);
    }
};

//CLASE PARA ERRORES
class CLerror {
    mensaje='';
    paramentro='';
  }

//PARA GUARDAR
exports.Guardar= async (req,res)=>{
    const validaciones = validationResult(req);
    const { idpedido,idmesa,cuenta,nombrecuenta} = req.body;
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
                await ModeloPedidosMesa.create({
                    idpedido: idpedido,
                    idmesa: idmesa,
                    cuenta: cuenta,
                    nombrecuenta: nombrecuenta
                })
                .then((data)=>{
                    msj.datos=data;
                })
            msj.estado='correcto';
            msj.mensaje= 'Peticion ejecutada correctamente. ';
            }
            msjRes(res,200,msj);
        } catch (error) {
            console.error(error);
            msj.mensaje='Error al guardar los datos';
            msj.errores=error;
            msjRes(res,500,msj);
        }
    }
};