const express = require('express');
const router = express.Router();
const Product_Group_Controllers = require('../controllers/Product_Group/Product_Group.Controller');
router.post('/search',Product_Group_Controllers.search);
router.post('/create',Product_Group_Controllers.create);
router.post('/update',Product_Group_Controllers.update);
router.get('/delete/:id',Product_Group_Controllers.delete);
router.get('/getById/:id',Product_Group_Controllers.getById);

module.exports = router