const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
  const Products = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Product_Code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    Product_Images: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Product_Detail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Product_Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });
  Products.sync();


module.exports = Products