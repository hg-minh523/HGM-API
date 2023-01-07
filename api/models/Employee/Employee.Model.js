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
        unique: true,
        primaryKey: true
    },
    Employee_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, Employee_BirthDay: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Employee_Account: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    Employee_Avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Employee_Phone: {
        type: DataTypes.STRING,
    },
    Employee_Email: {
        type: DataTypes.STRING,
        unique: true,
    },
    Employee_CI: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Status:{
        type: DataTypes.STRING,
    }
});
Employee.sync();


module.exports = Employee