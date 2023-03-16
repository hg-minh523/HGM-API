require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const database = require('./api/database/Database')
const routes = require('./api/routes/app')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const session = require("express-session")
// Setup middlerware
app.use(cors({
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // maxAge: 600,
  origin: ["http://localhost:3000","http://localhost:3006"],
}));
// Creating session 
app.use(session({
  name: "session-id",
  secret: "GFGEnter", // Secret key,
  saveUninitialized: false,
  resave: false,
}))


app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
console.log(__dirname);
app.use(express.static(path.join(__dirname, '/api/assets')));
database.authenticate() 
  .then(result => console.log("Connect database"))  
  .catch(err => console.log("Connect database false"));
// Run router
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
