const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
  const Product_Group = db.define('Prudct_Group', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Product_Group_Code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true

    },
    Product_Group_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Status:{
        type: DataTypes.STRING,
        allowNull: false,
      }
  });
  Product_Group.sync();


module.exports = Product_Group