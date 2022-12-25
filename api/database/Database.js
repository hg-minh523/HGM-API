const { Sequelize } = require('sequelize');
module.exports =  new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
});


