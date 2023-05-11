const{validationResult} = require('express-validator');
const ModeloDetallePedido = require('../modelos/ModeloDetallePedido');
const ModeloPedido = require('../modelos/ModeloPedidos');
const modeloPedidosCancelados = require('../modelos/ModeloPedidosCancelados');
const modeloPedidosElaborado = require('../modelos/ModeloPedidosElaborados');
const modeloPedidosEntregado = require('../modelos/ModeloEntregaPedido');
const modeloProducto = require('../modelos/ModeloProducto');
const modelousuario = require('../modelos/ModeloUsuario');
const MSJ = require('../componentes/mensaje')

//PARA LISTAR

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
exports.Listar= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        const lista = await ModeloDetallePedido.findAll();
        /*console.log(lista[0].idregistro);*/
        msj.estado='correcto';
        msj.mensaje= 'Peticion ejecutada correctamente. ';
        msj.datos=lista;
    } catch (error) {
        console.error(error);
        msj.mensaje='Ocurrio un error al consultar el detalle del pedido' + ' ' + error;
    }
    res.json(msj);
};

exports.Listarmodificar= async (req,res)=>{
    const {idregistro} = req.query;
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        const lista = await ModeloDetallePedido.findAll({
            attributes: ['CodigoProducto','Cantidad','Cancelado','Notas','Elaborado','Entregado', 'Facturado'],
            where:{
                idregistro: idregistro
            },
        });
        /*console.log(lista[0].idregistro);*/
        msj.estado='correcto';
        msj.mensaje= 'Peticion ejecutada correctamente. ';
        msj.datos=lista;
    } catch (error) {
        console.error(error);
        msj.mensaje='Ocurrio un error al consultar el detalle del pedido' + ' ' + error;
    }
    res.json(msj);
};

exports.Listaridregistro= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        const lista = await ModeloDetallePedido.findAll({
            attributes: ['idregistro'],
        });
        /*console.log(lista[0].idregistro);*/
        msj.estado='correcto';
        msj.mensaje= 'Peticion ejecutada correctamente. ';
        msj.datos=lista;
    } catch (error) {
        console.error(error);
        msj.mensaje='Ocurrio un error al consultar el detalle del pedido' + ' ' + error;
    }
    res.json(msj);
};

exports.Listar2= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        /*const lista = await ModeloPedido.findAll({
            attributes: ['NumeroPedido','activo'],
            include: {
                model: ModeloDetallePedido,
                attributes:['Cantidad','Notas'],
                include: {
                    model: modeloProducto,
                    attributes:['Nombre', 'Descripcion', 'Precio', 'nombreImagen'],
                },
            },
        });*/
        const lista = await ModeloDetallePedido.findAll({
            attributes: ['NumeroPedido','Cantidad','Notas'],
            include: {
                model: modeloProducto,
                attributes:['Nombre', 'Descripcion', 'Precio', 'nombreImagen'],
            },
        });
        msj.datos= lista;
        MSJ(res, 200, msj);
    } catch (error) {
        console.error(error);
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        MSJ(res, 500, msj);
    }
};

exports.Listar3= async (req,res)=>{
    var msj = {
        estado:'correcto',
        mensaje: 'Peticion ejecutada correctamente. ',
        datos:'',
        errores:''
    };
    try {
        /*const lista = await ModeloPedido.findAll({
            attributes: ['NumeroPedido','activo'],
            include: {
                model: ModeloDetallePedido,
                attributes:['Cantidad','Notas'],
                include: {
                    model: modeloProducto,
                    attributes:['Nombre', 'Descripcion', 'Precio', 'nombreImagen'],
                },
            },
        });*/
        const lista = await modeloProducto.findAll({
            attributes: ['Nombre'],
        });
        msj.datos= lista;
        MSJ(res, 200, msj);
    } catch (error) {
        console.error(error);
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        MSJ(res, 500, msj);
    }
};

//CLASE PARA ERRORES
class CLerror{
    mensaje= '';
    paramentro = '';
}

//CLASE PARA DATOS
class CLdatos{
    datos= '';
}

//PARA GUARDAR
exports.Guardar = async(req,res)=>{
    const validaciones = validationResult(req);
    const {NumeroPedido, CodigoProducto, Cantidad, Cancelado, Notas, Elaborado, Entregado, Facturado, subproducto} = req.body;

    var errores = [];
    /* var error = {
            mensaje: '',
            razon:'',
            paramentro: ''
        };*/

        var msj = {
            estado:'correcto',
            mensaje: 'Peticion ejecutada correctamente. ',
            datos:'',
            errores:''
        };

    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            const p = new CLerror();
            p.mensaje=element.msg;
            p.paramentro = element.param;
            errores.push(p);
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

            if(!buscarNumeroPedidoExistente){
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
                    Facturado: Facturado,
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

//PARA MODIFICAR
exports.Modificar= async(req, res)=>{
    const validaciones = validationResult(req);
    const {idregistro} = req.query;
    const {NumeroPedido, CodigoProducto, Cantidad, Cancelado, Notas, Elaborado, Entregado, Facturado, subproducto} = req.body;

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
                const p = new CLerror();
                p.mensaje=element.msg;
                p.paramentro = element.param;
                errores.push(p);
            });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj); 
    }
    else{
        try{
            var buscarIdDetallePedido = await ModeloDetallePedido.findOne({
                where:{
                    idregistro:idregistro
                }
            });

            const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                where:{
                    NumeroPedido: NumeroPedido
                }
            });

            if(!buscarIdDetallePedido){
                msj.razon =" No existe el ID de registro del detalle del Pedido. ";
            } 
            else
            if(!buscarNumeroPedidoExistente){
                msj.razon="No existe el ID del Pedido.";
                msj.estado='precaucion';
                msj.mensaje='la peticion no se ejecuto. '
            }
            else{
               buscarIdDetallePedido.NumeroPedido=NumeroPedido,
               buscarIdDetallePedido.CodigoProducto=CodigoProducto,
               buscarIdDetallePedido.Cantidad=Cantidad,
               buscarIdDetallePedido.Cancelado=Cancelado,
               buscarIdDetallePedido.Notas=Notas,
               buscarIdDetallePedido.Elaborado=Elaborado,
               buscarIdDetallePedido.Entregado=Entregado,
               buscarIdDetallePedido.Facturado=Facturado,
               buscarIdDetallePedido.subproducto=subproducto;
               await buscarIdDetallePedido.save()
                .then((data)=>{
                    msj.datos=data;
                    msj.mensaje= 'Detalle del Pedidio modificado correctamente.'
                })
                .catch((er)=>{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.errores= er;
                });
            }
            
            MSJ(res,200, msj);
        }
        catch (er) {
            console.error(er);
            msj.estado='error';
            msj.mensaje='La peticion no se modifico';
            msj.errores = er;
            MSJ(res,500, msj);
        }
    }
};

//PARA ELIMINAR
exports.Eliminar = async(req, res)=>{
    const msj ={
        mensaje: ""
    };

    msj.mensaje = 'No se pueden borrar el registro relacionado al detalle de los pedidos. ';

    res.json(msj);
};

//PARA MODIFICAR EL ESTADO DE CANCELAR
exports.ModificarCancelado= async(req, res)=>{
    const validaciones = validationResult(req);
    const {idregistro} = req.query;
    const {NumeroPedido,Cancelado,usuario,fechahora} = req.body;
        var datos =[];
        var errores = [];   
        var msj = {
            estado:'correcto',
            mensaje: 'Peticion ejecutada correctamente. ',
            dato:'',
            razon:'',
            errores:''
        }

        if(validaciones.errors.length > 0){
            validaciones.errors.forEach(element => {
                const p = new CLerror();
                p.mensaje=element.msg;
                p.paramentro = element.param;
                errores.push(p);
            });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj); 
    }
    else{
        if (Cancelado == 0) {
            msj.estado = "precaucion";
            msj.mensaje = "No esta cancelando la orden. ";
            MSJ(res, 200, msj);
          } else {
        try{
                var buscarIdDetallePedido = await ModeloDetallePedido.findOne({
                    where:{
                        idregistro:idregistro
                    }
                });
    
                const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                    where:{
                        NumeroPedido: NumeroPedido
                    }
                });
            

            if(!buscarIdDetallePedido){
                msj.razon =" No existe el ID de registro del detalle del Pedido. ";
            } 
            else
            var idRegistroDetallePedido = buscarIdDetallePedido.idregistro;
            if(!buscarNumeroPedidoExistente){
                msj.razon="No existe el ID del Pedido.";
                msj.estado='precaucion';
                msj.mensaje='la peticion no se ejecuto. '
            }
            else{
                const buscarusuario = await  modelousuario.findOne({
                    where:{
                        idregistro: usuario
                    }
                });
                    if(!buscarusuario){
                        msj.razon = 'no existe el id del usuario. ';
                    }else 
                    {
                        var x = false;
                        //buscar pedidos cancelados
                        const buscarpedidoCancelado = await  modeloPedidosCancelados.findOne({
                            where:{
                                numeropedido: idRegistroDetallePedido
                            }
                        });

                        //si no encuentra el id de pedidos cancelados lo crea
                        if(!buscarpedidoCancelado){
                        await modeloPedidosCancelados.create({
                            numeropedido: idRegistroDetallePedido,
                            usuario: usuario,
                            fechahora: fechahora,
                            
                        })
                        .then((data)=>{
                            const p = new CLdatos();
                            p.datos=data;
                            datos.push(p);
                            x=true;
                        })
                        .catch((er)=>{
                            msj.razon="Error al crear los datos en la tabla PedidosCancelados";
                            msj.estado='precaucion';
                            msj.mensaje='la peticion no se ejecuto. '
                            msj.errores= er;
                        });

                        if (x=true){
                            buscarIdDetallePedido.Cancelado=Cancelado;
                            await buscarIdDetallePedido.save()
                                .then((data)=>{
                                    const p2 = new CLdatos();
                                    p2.datos=data;
                                    datos.push(p2);
                                    msj.mensaje= 'El pedido se ah cancelado.'
                                })
                                .catch((er)=>{
                                    msj.estado='precaucion';
                                    msj.mensaje = 'La peticion no se ejecuto';
                                    msj.errores= er;
                                });
                        }
                        }
                        //si lo encuentra no lo cambia
                        else{
                            msj.estado='precaucion';
                            msj.mensaje = 'La peticion no se ejecuto';
                            msj.razon='Este pedido ya fue cancelado anteriormente';
                        }

                        

                        
                    }
                //////////////////////////////////////
            }
            
            MSJ(res,200, msj);
        }
        catch (er) {
            console.error(er);
            msj.estado='error';
            msj.mensaje='La peticion no se modifico';
            msj.errores = er;
            MSJ(res,500, msj);
        }
    }
    }
};

//PARA MODIFICAR EL ESTADO DE ELABORADOS
exports.ModificarElaborado= async(req, res)=>{
    const validaciones = validationResult(req);
    const {idregistro} = req.query;
    const {NumeroPedido,Elaborado,usuario,fechahora} = req.body;
        var datos =[];
        var errores = [];   
        var msj = {
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
                p.paramentro = element.param;
                errores.push(p);
            });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj); 
    }
    else{
        if (Elaborado == 0) {
            msj.estado = "precaucion";
            msj.mensaje = "No esta elaborando la orden. ";
            MSJ(res, 200, msj);
          } else {
        try{
            
            var buscarIdDetallePedido = await ModeloDetallePedido.findOne({
                where:{
                    idregistro:idregistro
                }
            });

            const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                where:{
                    NumeroPedido: NumeroPedido
                }
            });
        

        if(!buscarIdDetallePedido){
            msj.razon =" No existe el ID de registro del detalle del Pedido. ";
        } 
        else
            var idRegistroDetallePedido = buscarIdDetallePedido.idregistro;
        if(!buscarNumeroPedidoExistente){
            msj.razon="No existe el ID del Pedido.";
            msj.estado='precaucion';
            msj.mensaje='la peticion no se ejecuto. '
        }
        else{
            const buscarusuario = await  modelousuario.findOne({
                where:{
                    idregistro: usuario
                }
            });
                if(!buscarusuario){
                    msj.razon = 'no existe el id del usuario. ';
                }else 
                {
                    var x = false;
                    //buscar pedidos cancelados
                    const buscarPedidoElaborado = await  modeloPedidosElaborado.findOne({
                        where:{
                            iddetallepedido: idRegistroDetallePedido
                        }
                    });

                    //si no encuentra el id de pedidos elaborado lo crea
                    if(!buscarPedidoElaborado){
                    await modeloPedidosElaborado.create({
                        iddetallepedido: idRegistroDetallePedido,
                        idusuario: usuario,
                        fechahora: fechahora,
                        
                    })
                    .then((data)=>{
                        const p = new CLdatos();
                        p.datos=data;
                        datos.push(p);
                        x=true;
                    })
                    .catch((er)=>{
                        msj.razon="Error al crear los datos en la tabla Pedidos_elaborados";
                        msj.estado='precaucion';
                        msj.mensaje='la peticion no se ejecuto. '
                        msj.errores= er;
                    });

                    if (x=true){
                        buscarIdDetallePedido.Elaborado=Elaborado;
                        await buscarIdDetallePedido.save()
                        .then((data)=>{
                            const p2 = new CLdatos();
                            p2.datos=data;
                            datos.push(p2);
                            msj.mensaje= 'El pedido se a Elaborado.'
                        })
                        .catch((er)=>{
                            msj.estado='precaucion';
                            msj.mensaje = 'La peticion no se ejecuto';
                            msj.errores= er;
                        });
                }
                }
                //si lo encuentra no lo cambia
                else{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.razon='Este pedido ya fue Elaborado anteriormente';
                }

                

                
            }
        //////////////////////////////////////
        }
        
        MSJ(res,200, msj);
            ///////////////////
        }
        catch (er) {
            console.error(er);
            msj.estado='error';
            msj.mensaje='La peticion no se modifico';
            msj.errores = er;
            MSJ(res,500, msj);
        }
    }
    }
};

//PARA MODIFICAR EL ESTADO DE ENTREGADOS
exports.ModificarEntregado= async(req, res)=>{
    const validaciones = validationResult(req);
    const {idregistro} = req.query;
    const {NumeroPedido,Entregado,usuario,identrega,fechahora} = req.body;
        var datos = [];
        var errores = [];   
        var msj = {
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
                p.paramentro = element.param;
                errores.push(p);
            });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj); 
    }
    else{
        if (Entregado == 0) {
            msj.estado = "precaucion";
            msj.mensaje = "No esta Entregando la orden. ";
            MSJ(res, 200, msj);
          } else {
        try{
            
            var buscarIdDetallePedido = await ModeloDetallePedido.findOne({
                where:{
                    idregistro:idregistro
                }
            });

            const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                where:{
                    NumeroPedido: NumeroPedido
                }
            });
        

        if(!buscarIdDetallePedido){
            msj.razon =" No existe el ID de registro del detalle del Pedido. ";
        } 
        else
            var idRegistroDetallePedido = buscarIdDetallePedido.idregistro;
        if(!buscarNumeroPedidoExistente){
            msj.razon="No existe el ID del Pedido.";
            msj.estado='precaucion';
            msj.mensaje='la peticion no se ejecuto. '
        }
        else{
            const buscarusuario = await  modelousuario.findOne({
                where:{
                    idregistro: usuario
                }
            });
                if(!buscarusuario){
                    msj.razon = 'no existe el id del usuario. ';
                }else 
                {
                    var x = false;
                    //buscar pedidos cancelados
                    const buscarPedidoEntregado = await  modeloPedidosEntregado.findOne({
                        where:{
                            iddetalle_pedido: idRegistroDetallePedido
                        }
                    });

                    //si no encuentra el id de pedidos elaborado lo crea
                    if(!buscarPedidoEntregado){
                    await modeloPedidosEntregado.create({
                        iddetalle_pedido: idRegistroDetallePedido,
                        usuario: usuario,
                        fechahora: fechahora,
                        identrega: identrega,
                        
                    })
                    .then((data)=>{
                        const p = new CLdatos();
                        p.datos=data;
                        datos.push(p);
                        x=true;
                    })
                    .catch((er)=>{
                        msj.razon="Error al crear los datos en la tabla Pedidos_elaborados";
                        msj.estado='precaucion';
                        msj.mensaje='la peticion no se ejecuto. '
                        msj.errores= er;
                    });

                    if (x=true){
                        buscarIdDetallePedido.Entregado=Entregado;
                        await buscarIdDetallePedido.save()
                        .then((data)=>{
                            const p2 = new CLdatos();
                            p2.datos=data;
                            datos.push(p2);
                            msj.mensaje= 'El pedido se a Entregado.'
                        })
                        .catch((er)=>{
                            msj.estado='precaucion';
                            msj.mensaje = 'La peticion no se ejecuto';
                            msj.errores= er;
                        });
                }
                }
                //si lo encuentra no lo cambia
                else{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.razon='Este pedido ya fue Entregado anteriormente';
                }

                

                
            }
        //////////////////////////////////////
        }
        
        MSJ(res,200, msj);
            ///////////////////
        }
        catch (er) {
            console.error(er);
            msj.estado='error';
            msj.mensaje='La peticion no se modifico';
            msj.errores = er;
            MSJ(res,500, msj);
        }
    }
    }
};

//PARA MODIFICAR EL ESTADO DE FACTURADOS
exports.ModificarFacturado= async(req, res)=>{
    const validaciones = validationResult(req);
    const {idregistro} = req.query;
    const {NumeroPedido,Facturado} = req.body;

        var errores = [];   
        var msj = {
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
                p.paramentro = element.param;
                errores.push(p);
            });
        msj.estado='precaucion';
        msj.mensaje='la peticion no se ejecuto. '
        msj.errores=errores;
        MSJ(res,200, msj); 
    }
    else{
        try{
                var buscarIdDetallePedido = await ModeloDetallePedido.findOne({
                    where:{
                        idregistro:idregistro
                    }
                });
    
                const buscarNumeroPedidoExistente = await ModeloPedido.findOne({
                    where:{
                        NumeroPedido: NumeroPedido
                    }
                });
            

            if(!buscarIdDetallePedido){
                msj.razon =" No existe el ID de registro del detalle del Pedido. ";
            } 
            else
            if(!buscarNumeroPedidoExistente){
                msj.razon="No existe el ID del Pedido.";
                msj.estado='precaucion';
                msj.mensaje='la peticion no se ejecuto. '
            }
            else{
               buscarIdDetallePedido.Facturado=Facturado;
               await buscarIdDetallePedido.save()
                .then((data)=>{
                    msj.datos=data;
                    msj.mensaje= 'Parametro Facturado modificado correctamente.'
                })
                .catch((er)=>{
                    msj.estado='precaucion';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.errores= er;
                });
            }
            
            MSJ(res,200, msj);
        }
        catch (er) {
            console.error(er);
            msj.estado='error';
            msj.mensaje='La peticion no se modifico';
            msj.errores = er;
            MSJ(res,500, msj);
        }
    }
};

