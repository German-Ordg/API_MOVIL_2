const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const Producto = require('../modelos/ModeloProducto');
const Usuario = require('../modelos/ModeloUsuario2');
const MSJ = require('../componentes/mensaje');
exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const { Codigo } = req.body;
    console.log(req.body)
    console.log(Codigo);
    console.log(filename);
    try {
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
        var buscarpro = await Producto.findOne({
            where:{
                Codigo: Codigo
            }
        });
        if(!buscarpro){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/productos/' + filename));
            if(!buscarImagen){
                console.log('No lo encontro');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/productos/' + filename));
                console.log('Imagen eliminada');
            }
            error.mensaje='El Codigo del producto No existe. Se elimino la imagen enviada';
            error.parametro='Codigo';
            errores.push(error);
            msj.estado= 'precaucion',
            msj.mensaje= 'Peticion ejecutada correctamente',
            msj.errores=errores;
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/productos/' + buscarpro.nombreImagen));
            if(!buscarImagen){
                console.log('No lo encontro');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/productos/' + buscarpro.nombreImagen));
                console.log('Imagen eliminada');
            }
            buscarpro.nombreImagen=filename;
            await buscarpro.save()
            .then((data)=>{
                msj.datos = data;
            })
            .catch((error)=>{
                msj.errores=error;
            });
        }
        MSJ(res, 200, msj);
    } catch (error) {
        msj.estado='error';
        msj.mensaje='Peticion no procesada';
        msj.errores=error;
        MSJ(res, 500, msj);
    }
};


exports.Recibirusuario = async (req, res) => {
    const { filename } = req.file;
    const { idregistro } = req.query;
    
    console.log(idregistro);
    console.log(filename);
    try {
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
        var buscarpro = await Usuario.findOne({
            where:{
                idregistro: idregistro
            }
        });
        if(!buscarpro){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + filename));
            if(!buscarImagen){
                console.log('No lo encontro');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + filename));
                console.log('Imagen eliminada');
            }
            error.mensaje='El Codigo del usuario No existe. Se elimino la imagen enviada';
            error.parametro='Codigo';
            errores.push(error);
            msj.estado= 'precaucion',
            msj.mensaje= 'Peticion ejecutada correctamente',
            msj.errores=errores;
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + buscarpro.nombreImagen));
            if(!buscarImagen){
                console.log('No lo encontro');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + buscarpro.nombreImagen));
                console.log('Imagen eliminada');
            }
            buscarpro.nombreImagen=filename;
            await buscarpro.save()
            .then((data)=>{
                msj.datos = data;
            })
            .catch((error)=>{
                msj.errores=error;
            });
        }
        MSJ(res, 200, msj);
    } catch (error) {
        msj.estado='error';
        msj.mensaje='Peticion no procesada';
        msj.errores=error;
        MSJ(res, 500, msj);
    }
};


