const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
const usuario = db.define(
    'usuarios',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        LoginUsuario:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        empleado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Contrasena: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        AccesoTotal:{
            type:  DataTypes.TINYINT,
            allowNull: false,
        },
        Habilitado:{
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        pin: {
            type: DataTypes.STRING(4),
            allowNull: true,
        },
        fallidos:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING(250),
            allowNull: false,
            
        },
        estado:{
            type: DataTypes.ENUM('BL', 'AC', 'IN'),
            allowNull: true,
        },
        nombreImagen:{
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        apellido:{
            type: DataTypes.STRING(45),
            allowNull: true,
        },
},
{
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
        beforeCreate(usuarios){
            const hash = bcrypt.hashSync(usuarios.Contrasena, 10)//toma la contraseña del modelo y lo genera 10 veces
            usuarios.Contrasena = hash;
        },
        beforeUpdate(usuarios){
            const hash = bcrypt.hashSync(usuarios.Contrasena, 10)//toma la contraseña del modelo y lo genera 10 veces
            usuarios.Contrasena = hash;
        },
    }
}
);
usuario.prototype.VerificarContrasena = (con, com) =>{
return bcrypt.compareSync(con, com);//se compara la que esta encriptada y la que no esta encriptada
};
module.exports = usuario;