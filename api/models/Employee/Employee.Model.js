const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
const Employee = db.define('Employee', {
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
    }, 
    Employee_BirthDay: {
        type: DataTypes.DATE,
        defaultValue: new Date()
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
    Employee_Creator: {
        type: DataTypes.STRING,
        // allowNull: true,
        foreignKey: true,
    },
    Status:{
        type: DataTypes.STRING,
    }
});
Employee.sync();


module.exports = Employee