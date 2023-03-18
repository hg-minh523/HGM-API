const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
  const Product_GroupEntity = db.define('Product_Group', {
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
  Promise.all([ Product_GroupEntity.sync()])



module.exports = Product_GroupEntity