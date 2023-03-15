const express = require('express');
const multer = require('multer');
const moment = require("moment");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'api/assets/product')
    },
    filename: function (req, file, cb) {
      const day = moment().format('YYYY-MM-DD-HH-mm-ss');
      cb(null, file.fieldname + '-' + day + '.png')
    }
  })
  
 const upload = multer({ storage: storage })
module.exports = upload