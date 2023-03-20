const express = require('express');
const router = express.Router();
const Post_Controllers = require('../controllers/Post/Post.Controller');
router.post('/create',Post_Controllers.create)
router.post('/update',Post_Controllers.update)
router.post('/search',Post_Controllers.search)
router.get('/getById/:id',Post_Controllers.getById)
router.get('/delete/:id',Post_Controllers.delete)


module.exports = router