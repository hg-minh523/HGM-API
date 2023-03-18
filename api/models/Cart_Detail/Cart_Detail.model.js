const { DataTypes, BulkRecordError } = require('sequelize');
const db = require('../../database/Database');
const ProductEntity = require('../Products/Products.Model');
const CartDetailEntity = db.define('CartDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Cart_Detail_Product: {
        type: DataTypes.STRING,
        foreignKey: true,
    },

    Cart_Detail_Price: {
        type: DataTypes.INTEGER,
    },

    Cart_Detail_Quantity: {
        type: DataTypes.INTEGER,

    },
    key: {
        type: DataTypes.INTEGER,

    },
    Cart_Code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (record, option) => {
            const productPrice = await ProductEntity.findAll({
                where: {
                    Product_Code: record.dataValues.Cart_Detail_Product
                }
            })
            record.dataValues.Cart_Detail_Price = productPrice[0].dataValues?.Product_Price * record.dataValues.Cart_Detail_Quantity
        },
    }
});
Promise.all([CartDetailEntity.sync()])


module.exports = CartDetailEntity