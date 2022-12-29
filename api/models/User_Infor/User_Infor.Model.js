const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
  const User_InforShema = db.define('User', {
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
     User_Employee_Code: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignkey: true
    },
    User_Information_DisplayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    User_Information_Avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  User_InforShema.sync();


module.exports = User_InforShema