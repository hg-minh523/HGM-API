const { verifyUser } = require('../../common/authentication');
const Cart = require('../../models/Cart/Cart.Model');
const { autoIncrementCode } = require('../../common/CommonMethod');
const jwt = require("jsonwebtoken")
genarateCode = async () => {
    try {
        const findUser = await Cart.findAll();
        const userCode = findUser[findUser.length - 1]?.dataValues.Cart_Code
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
            try {
                const result = Cart.create(model);
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
                Cart_PhoneNumber: model.Cart_PhoneNumber,
                Customer_Code: model.Customer_Code,
                Cart_Email: model.Cart_Email,
                Cart_MethodPay: model.Cart_MethodPay,
                Cart_Note: model.Cart_Note,
                Status: model.Status
            };

            Cart.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async getById(req, res) {
            const ids = Number.parseInt(req.params.id);
            Cart.findAll({
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
                const result = Cart.destroy({
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
            if (!!model.Cart_Code) {
                query.Cart_Code = model.Cart_Code
            }
            if (!!model.Cart_MethodPay) {
                query.Cart_MethodPay = model.Cart_MethodPay
            }
            if (!!model.Cart_Note) {
                query.Cart_Note = model.Cart_Note
            }
            if (!!model.Cart_Email) {
                query.Cart_Email = model.Cart_Email
            }
            if (!!model.Customer_Code) {
                query.Customer_Code = model.Customer_Code
            }
            if (!!model.Cart_PhoneNumber) {
                query.Cart_PhoneNumber = model.Cart_PhoneNumber
            }

            if (!!model.status) {
                query.status = model.status
            }
            Cart.findAll({
                where: query
            }).then(result => {
                const data = result.map(item => item.dataValues)
                return res.status(200).json({ results: data })
            });
        },
    }