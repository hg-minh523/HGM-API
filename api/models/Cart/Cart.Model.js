const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
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
CartEntity.sync();


module.exports = CartEntity