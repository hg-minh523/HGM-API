const { DataTypes } = require('sequelize');
const db = require('../../database/Database');
const CartDetailEntity = require('../Cart_Detail/Cart_Detail.model');
const CustomerEntity = require('../Customer/Customer.Model');

const CartEntity = db.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

 Cart_Code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },

  Cart_PhoneNumber: {
    type: DataTypes.STRING,
  },
  Cart_Address: {
    type: DataTypes.STRING,
  },

 Cart_Email: {
    type: DataTypes.STRING,
  },
  Address: {
    type: DataTypes.STRING,

  },
 Cart_Note: {
    type: DataTypes.STRING,
  },

 Cart_MethodPay: {
    type: DataTypes.STRING,
  },
  Customer_Code: {
    type: DataTypes.STRING,
  },
  
  Status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
// Defind associate
CartEntity.hasOne(CustomerEntity,{
  sourceKey : `Customer_Code`,
  foreignKey: `Customer_Code`,
})
CustomerEntity.belongsTo(CartEntity,{
  foreignKey: `Customer_Code`,
})
CartEntity.hasMany(CartDetailEntity,{
  sourceKey : `Cart_Code`,
  foreignKey: `Cart_Code`,
})
CartDetailEntity.belongsTo(CartEntity,{
  foreignKey: 'Cart_Code'
})

Promise.all([CartEntity.sync()])

module.exports = CartEntity