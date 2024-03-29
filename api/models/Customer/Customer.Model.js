const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
const CustomerEntity = db.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    
    Customer_Code: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },

    Customer_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Customer_Phone: {
        type: DataTypes.STRING,
    },

    Customer_Email: {
        type: DataTypes.STRING,
        unique: true,
    },

    Status:{
        type: DataTypes.STRING,
    }
});
CustomerEntity.sync();


module.exports = CustomerEntity