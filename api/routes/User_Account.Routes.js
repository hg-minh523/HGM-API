const express = require('express');
const router = express.Router();
const userControlelr = require('../controllers/User_Account/User_Account');
router.post('/register',userControlelr.register);
router.post('/login',userControlelr.login);

module.exports = router