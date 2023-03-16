const express = require('express');
const router = express.Router();
const Customer_Controllers = require('../controllers/Customer/Customer.Controller');
router.post('/create',Customer_Controllers.create)
router.post('/update',Customer_Controllers.update)
router.post('/search',Customer_Controllers.search)
router.get('/getById/:id',Customer_Controllers.getById)
router.get('/delete/:id',Customer_Controllers.delete)


module.exports = router