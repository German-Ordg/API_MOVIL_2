const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const pedidos_elaborados = db.define(
    'pedidos_elaborados',
    {
        iddetallepedido: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            /*autoIncrement: true,*/
            allowNull: false,
        },
        idusuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Date()
        },
},
{
    tableName: 'pedidos_elaborados',
    timestamps: false,

}
);

module.exports = pedidos_elaborados;