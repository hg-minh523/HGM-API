const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
const CartDetailEntity = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Card_Detail_Product: {
        type: DataTypes.STRING,
        foreignKey: true,
    },

    Card_Detail_Price: {
        type: DataTypes.STRING,
    },

    Card_Detail_Promotion: {
        type: DataTypes.STRING,
    },

    Card_Detail_Amount: {
        type: DataTypes.STRING,
    },
    Card_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        foreignKey: true
    },
});
CartDetailEntity.sync();


module.exports = CartDetailEntity