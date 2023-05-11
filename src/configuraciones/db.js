const sequelize = require('sequelize');
const db = new sequelize(
    'sigresdesarrollo',
    'root',
    '123456',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306',
    }
);
module.exports = db;

/*
const sequelize = require('sequelize');
const db = new sequelize(
    'sigresdesarrollo',
    'pedidos',
    'Pedidos1@',
    {
        host: 'desofiw.xyz',
        dialect: 'mysql',
        port: '4306',
    }
);
module.exports = db;*/ 