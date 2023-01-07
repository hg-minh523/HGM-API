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
                Employee_Name: model.Employee_Name,
                Employee_Avatar: model.Employee_Avatar,
                Employee_Phone: model.Employee_Phone,
                Employee_Email: model.Employee_Email,
                Employee_SSR: model.Employee_SSR
            };
          
            Employee.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async getById(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.params.id;

            Employee.findAll({
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
                const result = Employee.destroy({
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
            Employee.findAll({
              where: query
            }).then(result => {
            const data= result.map(item => item.dataValues)
              return res.status(200).json({ results:data })
            });
          },
    }