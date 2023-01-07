const express = require('express');
const router = express.Router();
const Product_Group_Controllers = require('../controllers/Product_Group/Product_Group.Controller');
router.post('/search',Product_Group_Controllers.search);
router.post('/update',Product_Group_Controllers.update);
router.get('/getById/:id',Product_Group_Controllers.getById);
// router.get('/getById/:id',Product_Controllers.getById);



module.exports = router