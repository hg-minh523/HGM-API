require('dotenv').config()
const express = require('express');
const app = express();
const port =process.env.PORT ||3000;
const bodyParser = require('body-parser');
const database = require('./api/database/Database')
const routes = require('./api/routes/app')
const path = require('path')
const cors = require('cors');
app.use(bodyParser.urlencoded({
  extended: true
}));
console.log(__dirname)
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/assets')));
database.authenticate()
  .then(result => console.log("Connect database"))
  .catch(err => console.log("Connect database false"));
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
