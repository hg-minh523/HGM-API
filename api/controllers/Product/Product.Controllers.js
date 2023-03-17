const { verifyUser } = require('../../common/authentication');
const Product_Validator = require('./Product.Validation')
const Product = require('../../models/Products/Products.Model')
const moment = require('moment');
const Product_GroupEntity = require('../../models/Products_Group/Product_Group.Model');
    module.exports = {
        async create(req, res) {
            const user = await verifyUser(req.cookies.accessToken);

            if (!user){
                return res.json({msg: "Token expired"});
            }
            const model = req.body;
            const validateResult = await Product_Validator.checkBeforeCreate(model);
            if(validateResult === 1){
                return res.status(400).json({msg: "duplicate product code"});
            }
            try {
                // const pathImg = model?.Product_Images?.name;
                const day = moment().format('YYYY-MM-DD');
                const listImg = model.Product_Images_Request.map(item => {
                    return 'product' +'-'+ day  + '-'+ item.name+'.png'
                })
                model.Product_Images = `${listImg}` || ''
                model.Product_Creator = user.id
                const result = Product.create(model);
                if(!!result){
                    return res.status(200).json({msg: "sucees"});
                }else {
                    return res.status(401).json({msg: "failt"});

                }
            } catch (error) {

            }
        },
        
        async update(req, res) {
            const user = await verifyUser(req.cookies.accessToken);
            const model = req.body;
            const query = { id: model.id };
            const valueUpdate = {
                Product_Name: model.Product_Name,
                Product_Price: model.Product_Price,
                Product_Group_Code: model.Product_Group_Code,
                Product_Detail: model.Product_Detail,
                Product_Description: model.Product_Description,
                Status: model.Status,
                Product_Creator: user.id
            };
          
            Product.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues });
            });
        },
        async getById(req, res) {
            const ids = req.params.id;

            Product.findAll({
                where: {
                    id: ids
                }
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },

        async delete(req, res) {
            const ids = req.params.id;
            try {
                const result = Product.destroy({
                    where: {id:ids}
                });
                if(!!result){
                    return res.status(200).json({msg: "sucees"});
                }else {
                    return res.status(401).json({msg: "failt"});

                }
            } catch (error) {

            }
        },

        async search(req, res) {
            const model = req.body?.searchModel || req.body;
            const query = {};
            if (!!model.Product_Code && model.Product_Code !== ''){
                query.Product_Code =  {$like: model.Product_Code}
            }
            if (!!model.Product_Name && model.Product_Name !== ''){
                query.Product_Name = model.Product_Name
            }
            if (!!model.Product_Detail && model.Product_Detail !== ''){
                query.Product_Detail = model.Product_Detail
            }

            if (!!model.Product_Status && model.Product_Status !== ''){
                query.Product_Status = model.Product_Status
            }

            if (!!model.Product_Group_Code && model.Product_Group_Code.length > 0){
                query.Product_Group_Code = model.Product_Group_Code
            }
            Product.findAll({
              where: {},
              include: {model : Product_GroupEntity}            
            }).then(result => {
                // if(!!result)
            const data= result.map(item => item.dataValues)
              return res.status(200).json({ results:data })
            });
          },
    }