const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Producto = require('./ModeloProducto')
const detalle_pedido = db.define(
    'detalle_pedido',
    {
        idregistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NumeroPedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CodigoProducto:{
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        Cantidad:{
            type: DataTypes.DOUBLE(11, 10),
            allowNull: false,
        },
        Cancelado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Notas:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Elaborado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Entregado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Facturado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        subproducto:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'detalle_pedido',
        timestamps: false,
    }
);

Producto.hasMany(detalle_pedido, {
    foreignKey: 'CodigoProducto',
    otherKey: 'idregistro'
});
detalle_pedido.belongsTo(Producto,{
    foreignKey: 'CodigoProducto',
    otherKey: 'idregistro'
});

module.exports = detalle_pedido;
