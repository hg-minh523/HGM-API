const express = require('express');
const router = express.Router();
const userControlelr = require('../controllers/User_Account/User_Account');
router.post('/register',userControlelr.register);
router.post('/login',userControlelr.login);
router.post('/search',userControlelr.search);
router.post('/update',userControlelr.update);
router.post('/delete',userControlelr.delete);
router.get('/getById/:id',userControlelr.getById);


module.exports = router