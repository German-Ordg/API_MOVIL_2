const { DataTypes } = require('sequelize');
const db = require('../../configuraciones/db');
const Cargo = require('./ModeloCargo');
const Empleado = db.define(
    'empleado',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'idregistro'
        },
        identidad:{
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            field: 'NumeroIdentidad'
        },
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'NombreEmpleado'
        },
        apellido:{
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'ApellidoEmpleado'
        },
        idcargo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'CargoEmpleado'
        },
        fechaingreso:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            field: 'FechaIngreso'
        },
        salario:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0,
            field: 'Salario'
        },
        nombreimagen:{
            type: DataTypes.STRING(250),
            allowNull: true
        },
        nombrecompleto:{
            type: DataTypes.VIRTUAL,
            get(){
                return this.nombre + ' ' + this.apellido;
            },
            set(){
                throw new Error('No se permiten valores en');
            }
        },
    },
    {
        tableName: 'empleados',
        timestamps: false,
    }
);
Cargo.hasMany(Empleado, {
    foreignKey: 'idcargo',
    otherKey: 'id'
});
Empleado.belongsTo(Cargo,{
    foreignKey: 'idcargo',
    otherKey: 'id'
});
module.exports = Empleado;