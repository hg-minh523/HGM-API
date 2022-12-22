const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const userModel = (sequelize,DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    User_Account_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    User_Account_Password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps: true,
    freezeTableName: true,
  }); 
  User.sync()
  return User
}


module.exports = userModel;