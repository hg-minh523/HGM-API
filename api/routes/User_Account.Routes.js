const express = require('express');
const router = express.Router();
const userControlelr = require('../controllers/User_Account/User_Account');
router.post('/register',userControlelr.register);
router.post('/refreshToken',userControlelr.refreshToken);
router.post('/login',userControlelr.login);
router.post('/search',userControlelr.search);
router.get('/getUserInformation',userControlelr.getUserInformation);
router.post('/update',userControlelr.update);
router.get('/getById/:id',userControlelr.getById);
router.get('/logout',userControlelr.logOut);


module.exports = router