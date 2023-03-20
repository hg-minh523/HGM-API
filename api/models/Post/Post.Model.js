const { DataTypes } = require('sequelize');
const db = require('../../database/Database');
  const ProductEntity = db.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    Post_Code: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    Post_Title: {
        type: DataTypes.STRING,
    },

    Post_Sub_Tiltple: {
        type: DataTypes.STRING,
    },

    Post_Detail: {
        type: DataTypes.STRING,

    },

    Post_Content: {
        type: DataTypes.STRING,

    },

    Status: {
        type: DataTypes.STRING,
    },

   
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
//   Promise.all([ProductEntity.sync()])

  
module.exports = ProductEntity