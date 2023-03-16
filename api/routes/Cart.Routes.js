const express = require('express');
const router = express.Router();
const Cart_Controllers = require('../controllers/Cart/Cart.Controller');
router.post('/create',Cart_Controllers.create)
router.post('/update',Cart_Controllers.update)
router.post('/search',Cart_Controllers.search)
router.get('/getById/:id',Cart_Controllers.getById)
router.get('/delete/:id',Cart_Controllers.delete)


module.exports = router