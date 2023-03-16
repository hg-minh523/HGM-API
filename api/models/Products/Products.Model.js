const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
  const ProductEntity = db.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    Product_Code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },

    Product_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Product_Group_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
    },

    Product_Price: {
        type: DataTypes.INTEGER,
    },

    Product_Detail: {
        type: DataTypes.STRING,
    },

    Product_Description: {
        type: DataTypes.STRING,
    },
    
    Product_Images: {
      type: DataTypes.STRING,
    },
    Product_Creator: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  ProductEntity.sync();

  
module.exports = ProductEntity