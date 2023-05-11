const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const entrega_Pedido = db.define(
    'entrega_pedido',
    {
        iddetalle_pedido: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Date()
        },
        identrega: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
},
{
    tableName: 'entrega_pedido',
    timestamps: false,

}
);

module.exports = entrega_Pedido;