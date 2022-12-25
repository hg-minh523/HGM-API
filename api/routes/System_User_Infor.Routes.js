const express = require('express');
const router = express.Router();
const User_Information_Controllers = require('../controllers/User_Information/User_Information.Controllers');
router.post('/create',User_Information_Controllers.create)

module.exports = router