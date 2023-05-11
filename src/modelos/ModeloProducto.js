const { DataTypes } =require('sequelize');
const db = require('../configuraciones/db');

const Productos = db.define(
    'productos',
    {
        Codigo: {
            type:  DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
        },
        Nombre:{
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        Descripcion:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Existencia:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        Precio: {
            type:  DataTypes.DOUBLE,
            allowNull: false,
        },
        Costo:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        CantidadMinima:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        exento:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Imagen: {
            type:  DataTypes.TEXT,
            allowNull: true,
        },
        Habilitado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        tipo2:{
            type: DataTypes.ENUM('GE', 'EL', 'PR', 'AL'),
            allowNull: true,
        },
        orden:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        impuestov: {
            type:  DataTypes.DOUBLE,
            allowNull: true,
        },
        impuestoValor:{
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        ultimo:{
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        nombreImagen:{
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        idprincipal: {
            type:  DataTypes.STRING(15),
            allowNull: true,
        },
        cantidadprincipal:{
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        idusuario:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        movimiento:{
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        TipoProducto:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'productos',
        timestamps: false,
    }
);
module.exports = Productos;