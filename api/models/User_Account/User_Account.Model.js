const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../database/Database')
const bcrypt = require('bcrypt');
const Employee = require('../Employee/Employee.Model')
const UserEntity = db.define('User', {
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
    async set(value) {
      const saltRounds = 10;
      const hash = await bcrypt.hashSync(value, saltRounds);
      this.setDataValue('User_Account_Password', hash);
    }
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

UserEntity.belongsTo(Employee,{
  foreignKey:{
    name: "employeeId",
    type: DataTypes.STRING,
    allowNull: true,
  }
})

UserEntity.sync({});


module.exports = UserEntity;