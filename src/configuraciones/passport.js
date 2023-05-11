const passport = require('passport');
const Usuario = require('../modelos/ModeloUsuario');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const expiracion = moment.duration(500, "m").asSeconds();
const claveToken = 'MiClaveSegura';
exports.getToken = (data) =>{
    return JWT.sign(data, claveToken, {expiresIn: expiracion});
};
const opciones = {
    jwtFromRequest: extraerJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: claveToken
};
passport.use(new estrategiaJWT(opciones, async (payload, done)=> {
    return await Usuario.findOne({
        where:{
            idregistro: payload.idregistro,
            Habilitado: 1,
            estado: 'AC'
        }
    })
    .then((data)=>{
        return done(null, data.idregistro);
    })
    .catch((error)=>{
        console.log(error);
        return done(null, false);
    });
}));
exports.ValidarAutendicado = 
passport.authenticate('jwt', {
    session: false, failureRedirect: '/api/autenticacion/error'
});