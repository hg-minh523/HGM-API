const { DataTypes } = require('sequelize');
const db = require('../../database/Database')
const NotificationEntity = db.define('NotificationEntity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    Notification_Code: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },

    Notification_Content: {
        type: DataTypes.STRING,
    },

    Notification_Content_Detail: {
        type: DataTypes.TEXT,
    },

    Notification_Creator: {
        type: DataTypes.STRING
    },
    Status:{
        type: DataTypes.STRING,
    }
});
NotificationEntity.sync();


module.exports = NotificationEntity