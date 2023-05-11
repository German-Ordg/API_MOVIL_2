const { DataTypes } = require('sequelize');
const db = require('../../configuraciones/db');
const bcrypt = require('bcrypt');
const Empleado = require('./ModeloEmpleado');
const Usuario = db.define(
    'usuario',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'idregistro',
        },
        login:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            field: 'LoginUsuario',
        },
        idempleado:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'empleado',
        },
        contrasena:{
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'Contrasena',
        },
        accesototal:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'AccesoTotal',
        },
        habilitado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
            field: 'Habilitado',
        },
        pin:{
            type: DataTypes.STRING(4),
            allowNull: true,
            defaultValue: '0000',
        },
        fallidos:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        correo:{
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true,
        },
        estado:{
            type: DataTypes.ENUM('BL','AC','IN'),
            allowNull: true,
            defaultValue: 'AC',
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false,
        hooks: {
            beforeCreate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.Contrasena = hash;
            },
            beforeUpdate(usuario){
                if(usuario.contrasena){
                  const hash = bcrypt.hashSync(usuario.contrasena, 10);
                    usuario.Contrasena = hash;  
                }
            },
        }
    }
);
Usuario.prototype.VerificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};
Empleado.hasMany(Usuario, {
    foreignKey: 'idempleado',
    otherKey: 'id'
});
Usuario.belongsTo(Empleado,{
    foreignKey: 'idempleado',
    otherKey: 'id'
});
module.exports = Usuario;