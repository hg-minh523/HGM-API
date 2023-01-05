const { verifyUser } = require('../../common/authentication');
const Employee = require('../../models/Employee/Employee.Model');
const { autoIncrementCode } = require('../../common/CommonMethod');
genarateCode = async () => {
    try {
        const findUser = await Employee.findAll();
        const userCode = findUser[findUser.length - 1]?.dataValues.Employee_Code
        const newCode = userCode ? userCode : '';
        return autoIncrementCode(newCode)
    } catch (err) {
        // console.log(err)
    }
},
    module.exports = {
        async create(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const model = req.body
            model.Employee_Account = user.User_Account_Name
            model.Employee_Code = await genarateCode();
            try {
                const result = Employee.create(model);
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
                console.log(result[0])
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async delete(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.body.ids;
            Employee.destroy({
                where: {
                    id: ids
                }
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
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
              console.log(result[0].dataValues)
              return res.status(200).json({ data: result[0].dataValues })
            });
          },
    }