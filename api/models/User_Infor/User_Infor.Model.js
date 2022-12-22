const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sql12::memory:');

const userInformationModel = () => {
  const User_Information = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    User_Information_Code: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignkey: true
    },
    User_Information_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    User_Information_Address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    User_Information_Phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    User_Information_Email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User_Information.sync()
  return User_Information
}


module.exports = userInformationModel