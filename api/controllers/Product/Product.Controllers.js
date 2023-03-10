const { verifyUser } = require('../../common/authentication');
const Product_Validator = require('./Product.Validation')
const Products = require('../../models/Products/Products.Model');
    module.exports = {
        async create(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const model = req.body;
            const validateResult = await Product_Validator.checkBeforeCreate(model);
            if(validateResult === 1){
                return res.status(400).json({msg: "duplicate product code"});
            }
            try {
                const result = Products.create(model);
                if(!!result){
                    return res.status(200).json({msg: "sucees"});
                }else {
                    return res.status(401).json({msg: "failt"});

                }
            } catch (error) {

            }
        },
        async update(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const model = req.body;
            const query = { id: model.id };
            const valueUpdate = {
                Product_Name: model.Product_Name,
                Product_Price: model.Product_Price,
                Product_Group_Code: model.Product_Group_Code,
                Product_Detail: model.Product_Detail,
                Product_Description: model.Product_Description,
                Status: model.Status
            };
          
            Products.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues });
            });
        },
        async getById(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.params.id;

            Products.findAll({
                where: {
                    id: ids
                }
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },

        async delete(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.params.id;
            try {
                const result = Products.destroy({
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
            const model = req.body;
            const query = {};
            if (!!model.User_Account_Name) {
              query.User_Account_Name = model.User_Account_Name
            }
            if (!!model.User_Account_Permission) {
              query.User_Account_Name = model.User_Account_Permission
            }
            Products.findAll({
              where: query
            }).then(result => {
            const data= result.map(item => item.dataValues)
              return res.status(200).json({ results:data })
            });
          },
    }