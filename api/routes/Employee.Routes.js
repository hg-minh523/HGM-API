const express = require('express');
const router = express.Router();
const Employee_Controllers = require('../service/Employee/Employee.Controllers');
router.post('/create',Employee_Controllers.create)
router.post('/update',Employee_Controllers.update)
router.post('/search',Employee_Controllers.search)
router.get('/getById/:id',Employee_Controllers.getById)
router.get('/delete/:id',Employee_Controllers.delete)


module.exports = router