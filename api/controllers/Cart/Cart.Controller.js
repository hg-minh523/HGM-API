const { verifyUser } = require('../../common/authentication');
const Cart = require('../../models/Cart/Cart.Model');
const CartDetail = require('../../models/Cart_Detail/Cart_Detail.model');
const sequelize = require("../../database/Database")
// sequelize
const { autoIncrementCode } = require('../../common/CommonMethod');
const jwt = require("jsonwebtoken");
const CustomerEntity = require('../../models/Customer/Customer.Model');
const CartDetailEntity = require('../../models/Cart_Detail/Cart_Detail.model');
const genarateCode = async () => {
    try {
        const findCart = await Cart.findAll();
        const userCode = findCart[findCart.length - 1]?.dataValues.Cart_Code
        const newCode = userCode ? userCode : '';
        return autoIncrementCode(newCode,'CC')  
    } catch (err) {
        // console.log(err)
    }
}
    updateOrCreate = async (model) => {
        await CartDetailEntity.findOne({
            where: {
                Cart_Code: model.Cart_Code,
                Cart_Detail_Product: model.Cart_Detail_Product
            }
        }).then(async data => {
            console.log(data)
            if (!!data) {
                model.Cart_Detail_Price = model.Cart_Detail_Quantity * data.dataValues.Cart_Detail_Price
              await  CartDetailEntity.update(model,{
                    where: {id: model.id}
                })
            } else {
              await  CartDetailEntity.create(model)
            }
        })
    }
selectAmount = `(select sum(Cart_Detail_Price) from cartdetails  
join carts on cartdetails.Cart_Code = carts.Cart_Code where cartdetails.Cart_Code = Cart.Cart_Code 
group by cartdetails.Cart_Code)`
module.exports = {
    async create(req, res) {
        const token = req.cookies.accessToken;
        const user = verifyUser(token);
        const model = req.body
        const productList = model.Product_List;
        model.Cart_Code = await genarateCode();
        if(productList){
            productList.map(item => {
                let modelDetail = { 
                    Cart_Code: model.Cart_Code,
                    Cart_Detail_Product: item?.Cart_Detail_Product,
                    Cart_Detail_Price: item?.Cart_Detail_Price,
                    Cart_Detail_Quantity: item?.Cart_Detail_Quantity,
                    Cart_Detail_Amount: item?.Cart_Detail_Amount,
                    key :item.key
                };
                // modelDetail.
                CartDetail.create(modelDetail).then(result => {
                })
            })
        }
        
        try {
            const result = Cart.create(model);
            if (!!result) {
                return res.status(200).json({ msg: "sucees" });
            } else {
                return res.status(401).json({ msg: "failure" });

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
        const productList = model.Product_List;
        if(productList){
            productList.map(async item => {
                let modelDetail = {
                    Cart_Code: model.Cart_Code,
                    Cart_Detail_Product: item?.Cart_Detail_Product,
                    Cart_Detail_Price: item?.Cart_Detail_Price,
                    Cart_Detail_Quantity: item?.Cart_Detail_Quantity,
                    Cart_Detail_Amount: item?.Cart_Detail_Amount,
                    id: item.id
                };
                await updateOrCreate(modelDetail)
            })
        }
        
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
            },
            include: [
                { model: CustomerEntity },
                { model: CartDetailEntity },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(selectAmount), "Cart_Amount"
                    ]
                ],
                group: ["Cart.Cart_Code"]
            },
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
            where: query,
            include: [
                { model: CustomerEntity },
                { model: CartDetailEntity },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(selectAmount), "Cart_Amount"
                    ]
                ],
                group: ["Cart.Cart_Code"]
            },
        }).then(result => {
            const data = result.map(item => item.dataValues)
            return res.status(200).json({ results: data })
        });
    },
}