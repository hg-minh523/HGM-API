const express = require('express');
const app = express();
const port =process.env.PORT ||3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
  extended : true
}))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
