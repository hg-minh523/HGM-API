const { Sequelize } = require('sequelize');

module.exports =  new Sequelize(process.env.REACT_APP_DATABASE, process.env.REACT_APP_USER, process.env.REACT_APP_PASSWORD, {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
});


