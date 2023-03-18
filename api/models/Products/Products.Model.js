const { DataTypes } = require('sequelize');
const db = require('../../database/Database');
const Product_GroupEntity = require('../Products_Group/Product_Group.Model');
  const ProductEntity = db.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    Product_Code: {
      type: DataTypes.STRING,
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
        type: DataTypes.BIGINT,
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
  ProductEntity.hasOne(Product_GroupEntity,{
    sourceKey: "Product_Group_Code",
    foreignKey: "Product_Group_Code"
  })
  ProductEntity.belongsTo(ProductEntity, {
    // targetKey: "Product_Group_Code"
  })
  Promise.all([ProductEntity.sync()])

  
module.exports = ProductEntity