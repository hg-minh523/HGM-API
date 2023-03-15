const express = require('express');
const router = express.Router();
const Product_Controllers = require('../controllers/Product/Product.Controllers');
const upload = require('../middlerwares/UploadImageProduct')
router.post('/search',Product_Controllers.search);
router.post('/create',Product_Controllers.create);
router.post('/productImage',upload.single("product")),(req,res)=>{
    console.log(req.files)
    res.json({msg: "sucess"})};
router.post('/update',Product_Controllers.update);
router.get('/getById/:id',Product_Controllers.getById);
router.get('/delete/:id',Product_Controllers.delete);

module.exports = router