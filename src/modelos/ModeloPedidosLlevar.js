const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const pedidos_llevar = db.define(
    'pedidos_llevar',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idpedido:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idcliente:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
},
{
    tableName: 'pedidos_llevar',
    timestamps: false,

}
);

module.exports = pedidos_llevar;