const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const pedidos_cancelados = db.define(
    'pedidos_cancelados',
    {
        numeropedido: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date()
        },
},
{
    tableName: 'pedidos_cancelados',
    timestamps: false,

}
);

module.exports = pedidos_cancelados;