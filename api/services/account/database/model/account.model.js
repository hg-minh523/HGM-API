const { DataTypes } = require('sequelize');
const db = require('../connection')
const accountEntity = db.define('account', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  User_Account_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  User_Account_Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  User_Account_Permission: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
  freezeTableName: true,
});


await accountEntity.sync({});


module.exports = accountEntity;