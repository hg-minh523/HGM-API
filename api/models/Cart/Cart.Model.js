const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
  const CartEntity = db.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    Card_Code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },

    Customer_Code: {
    type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      foreignKey: true
    },

    Product_Code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  CartEntity.sync();


module.exports = CartEntity