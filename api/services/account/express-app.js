require('dotenv').config()

const express = require('express');
const { databaseConnection } = require('./database');
const expressApp = require('./src/account.controller');
const bodyParser = require('body-parser');
// const { CreateChannel } = require('./utils')

const StartServer = async () => {

    const app = express();

    // Connection database
    try {
        await databaseConnection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    // const channel = await CreateChannel()
    // Init middlerware
    app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(bodyParser.json({
        limit: '50mb'
      }));
      
    expressApp(app);
    app.use('/', (req, res) => {
        return res.json({msg : "welcome to account service"});
    })

    app.listen(process.env.PORT, () => {
        console.log(`listening to port ${process.env.PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
        .on('close', () => {
            channel.close();
        })


}

StartServer();