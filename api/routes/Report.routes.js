const express = require('express');
const router = express.Router();
const Report_Controller = require('../service/Report/Revenue_Report.Controller');
router.post('/revenueReport',Report_Controller.revenueReport);

module.exports = router