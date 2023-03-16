const { verifyUser } = require('../../common/authentication');
const Customer = require('../../models/Customer/Customer.Model');
const { autoIncrementCode } = require('../../common/CommonMethod');
const jwt = require("jsonwebtoken")
genarateCode = async () => {
    try {
        const findUser = await Customer.findAll();
        const userCode = findUser[findUser.length - 1]?.dataValues.Customer_Code
        const newCode = userCode ? userCode : '';
        return autoIncrementCode(newCode)
    } catch (err) {
        // console.log(err)
    }
},
    module.exports = {
        async create(req, res) {
            const token = req.cookies.accessToken;
            const user = verifyUser(token);
            const model = req.body
            // model.Customer_Code = await genarateCode();
            model.Customer_Creator = user.id;
            try {
                const result = Customer.create(model);
                if (!!result) {
                    return res.status(200).json({ msg: "sucees" });
                } else {
                    return res.status(401).json({ msg: "failt" });

                }
            } catch (error) {

            }
        },

        async update(req, res) {
            const user = await verifyUser(req.cookies.accessToken);
            const model = req.body;
            const query = { id: model.id }
            const valueUpdate = {
                Customer_Name: model.Customer_Name,
                Customer_Phone: model.Customer_Phone,
                Customer_Email: model.Customer_Email,
                Status: model.Status,
                Customer_Creator: user.id
            };

            Customer.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async getById(req, res) {
            const ids = Number.parseInt(req.params.id);
            Customer.findAll({
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
                const result = Customer.destroy({
                    where: { id: ids }
                });
                if (!!result) {
                    return res.status(200).json({ msg: "sucees" });
                } else {
                    return res.status(401).json({ msg: "failt" });

                }
            } catch (error) {

            }
        },

        async search(req, res) {
            const model = req.body;
            const query = {};
            if (!!model.Customer_Code) {
                query.Customer_Code = model.Customer_Code
            }

            if (!!model.Customer_Name) {
                query.Customer_Name = model.Customer_Name
            }

            

            if (!!model.Customer_Email) {
                query.Customer_Email = model.Customer_Email
            }

            if (!!model.Customer_Phone) {
                query.Customer_Phone = model.Customer_Phone
            }

            if (!!model.status) {
                query.status = model.status
            }
            Customer.findAll({
                where: query
            }).then(result => {
                const data = result.map(item => item.dataValues)
                return res.status(200).json({ results: data })
            });
        },
    }