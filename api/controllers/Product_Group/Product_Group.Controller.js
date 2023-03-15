const { verifyUser } = require('../../common/authentication');
const Product_Group = require('../../models/Products_Group/Product_Group.Model');
    module.exports = {
        async create(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const model = req.body
            try {
                const result = Product_Group.create(model);
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
            const query = { id: model.id }
            const valueUpdate = {
                Product_Group_Name: model.Product_Group_Name,
                Product_Group_Avatar: model.Employee_Avatar,
                Employee_Phone: model.Employee_Phone,
                Employee_Email: model.Employee_Email,
                Employee_SSR: model.Employee_SSR
            };
          
            Product_Group.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async getById(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.params.id;

            Product_Group.findAll({
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
            console.log(ids)
            try {
                const result = Product_Group.destroy({
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
            Product_Group.findAll({
              where: query
            }).then(result => {
            const data= result.map(item => item.dataValues)
              return res.status(200).json({ results:data })
            });
          },
    }