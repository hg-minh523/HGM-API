const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
const Employee = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Employee_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Employee_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Employee_Phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Employee_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Employee_SSR: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
Employee.sync();


module.exports = Employee