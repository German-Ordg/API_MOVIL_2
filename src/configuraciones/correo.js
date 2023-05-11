const nodemailer = require('nodemailer');
exports.RecuperarContrasena = async (data) =>{
    const configurarCorreo = {
        from: process.env.APP_CORREO,
        to: data.correo,
        subject: 'Recuperación de contraseña SIFCON',
        text: 'Pin temporal: ' + data.pin,
    };
    const transporte = nodemailer.createTransport({
        host: process.env.CORREO_SERVICIO,
        port: process.env.CORREO_PORT,
        secure: true,
        auth:{
            user: process.env.APP_CORREO,
            pass: process.env.CORREO_CONTRASENA,
        },
    });
    await transporte.verify(async function(error, success){
        if(error){
            console.log(error);
            return false;
        }
        else{
            console.log(success);
            console.log('El servidor puede enviar correos');
        }
    });
    return await transporte.sendMail(configurarCorreo);
};