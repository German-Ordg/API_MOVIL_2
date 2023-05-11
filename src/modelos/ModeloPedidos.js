const { DataTypes } =require('sequelize');
const db = require('../configuraciones/db');

const Pedidos = db.define(
    'pedidos',
    {
    NumeroPedido: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idmesero:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fechahora: {
        type:  DataTypes.DATE,
        allowNull: true,
        defaultValue: Date()
    },
    Estacion:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    modalidad:{
        type: DataTypes.ENUM('ME', 'DO', 'LL'),
        allowNull: true,
        defaultValue: 'ME'
    },
    estado:{
        type: DataTypes.ENUM('AAA', 'NNN', 'SNN', 'SSN', 'NNS', 'SNS', 'SSS', 'NSS', 'NSN'),
        allowNull: true,
        defaultValue: 'AAA'
    }
    },
    {
        tableName: 'pedidos',
        timestamps: false,
    }
);
module.exports = Pedidos;