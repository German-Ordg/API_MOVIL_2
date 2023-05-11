const res = require("express/lib/response");
const ModeloPedidos = require('../modelos/ModeloPedidos');
const{validationResult} = require('express-validator'); 
const MSJ = require('../componentes/mensaje')

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
        const lista = await ModeloPedidos.findAll();
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
    const { idmesero, fechahora, Estacion, activo, modalidad, estado} = req.body;
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
            const p=new CLerror();
            p.mensaje = element.msg;
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
                MSJ(res,200, msj);
        } catch (error) {
            console.error(error);
            msj.mensaje='Error al guardar los datos';
            MSJ(res,500, msj);
        }
    }
};

exports.Modificar = async (req, res) =>{
    const validaciones = validationResult(req);
    const { NumeroPedido } = req.query;
    const { idmesero, fechahora, Estacion, activo, modalidad, estado} = req.body;
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
    if(validaciones.errors.length > 0)
    {
        validaciones.errors.forEach(element => {
            const p=new CLerror();
            p.mensaje = element.msg;
            p.paramentro=element.param;
            errores.push(p);
        });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj);  
    }
    else{
        try {
            var buscarPedidos = await ModeloPedidos.findOne({
                where:{
                    NumeroPedido: NumeroPedido
                }
            });
            if(!buscarPedidos){
                msj.razon='No existe el id del pedido';
            }
            else{
                buscarPedidos.idmesero= idmesero,
                buscarPedidos.fechahora= fechahora,
                buscarPedidos.Estacion= Estacion,
                buscarPedidos.activo= activo,
                buscarPedidos.modalidad= modalidad,
                buscarPedidos.estado= estado 
                await buscarPedidos.save()
                .then((data)=>{
                    msj.datos=data;
                    msj.mensaje= 'Registro modificado exitosamente'
                })
                .catch((er)=>{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.errores= er;
                });
                MSJ(res,200, msj);
            }
        } catch (er) {
            console.error(er);
            msj.estado='error';
            msj.mensaje='La peticion no se modifico';
            msj.errores = er;
            MSJ(res,500, msj);
        }
    }
};
