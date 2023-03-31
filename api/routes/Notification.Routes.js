const express = require('express');
const router = express.Router();
const Notification_Controller = require('../controllers/Notification/Notification.Controller');
router.post('/create',Notification_Controller.create)
router.post('/search',Notification_Controller.search)



module.exports = router