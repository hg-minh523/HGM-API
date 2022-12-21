
require('dotenv').config()
import { Request, Response, NextFunction } from 'express';
const express = require('express')
const app = express()
const port = 8888
const path = require('path')
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});
app.use(express.static(path.join(__dirname,'api/assets')))
app.get('/', (req:Request, res:Response) => {
   res.json({
    hello: "hello"
   })
})

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Example app listening on port ${port}`)
})