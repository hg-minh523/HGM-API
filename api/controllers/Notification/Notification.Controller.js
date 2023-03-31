const { verifyUser } = require('../../common/authentication');
const NotificationEntity = require('../../models/Notification/Notificaition.Model');
const Product = require('../../models/Products/Products.Model')

const { autoIncrementCode } = require('../../common/CommonMethod');
const jwt = require("jsonwebtoken")
const genarateCode = async () => {
    try {
        const Notify = await NotificationEntity.findAll();
        const userCode = Notify[Notify.length - 1]?.dataValues.Notification_Code
        const newCode = userCode ? userCode : '';
        return autoIncrementCode(newCode,"NT")
    } catch (err) {
        // console.log(err)
    }
}

const handleSearchProduct = async (productList) => {
    const productListName =  productList.map(( (item) => {
        const product =  Product.findAll({
            where: { Product_Code : item.Cart_Detail_Product}
        }).then(result => {
            return result[0].dataValues.Product_Code;
        })
        return {
            product
        };
    }))
    return productListName;
}
module.exports = {
        async create(req, res) {
            const token = req.headers.authentication.split(" ")[1];
            const user =await verifyUser(token);
            const model = req.body
            model.Notification_Creator   = user.id;
            model.Notification_Code = await genarateCode();
            const productList = model.Product_List;
            const s = productList.reduce((preV, curV) => preV + curV.Cart_Detail_Product , '' )
            console.log(s)
            const stringContent = `Bạn có đơn đặt hàng với ${model.Notification_Code}, bấm vào xem chi tiết`;
            const stringContentDetail = `Đơn hàng ${model?.Notification_Code} \n
                                         Địa chỉ:  ${model?.Address} \n
                                         Phone : ${model?.Cart_PhoneNumber} \n
                                         Lưu ý: ${model?.Cart_Note} \n   
                                         Chi tiết sản phẩm : ${productList.reduce((preV, curV) => preV + curV.Cart_Detail_Product , '' )}
                                         `;

            model.Notification_Content = stringContent;
            model.Notification_Content_Detail = stringContentDetail;
            model.Notification_Creator = user.id
            model.Status = "New";
            try {
                const result = NotificationEntity.create(model);
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
                NotificationEntity_Name: model.NotificationEntity_Name,
                NotificationEntity_Avatar: model.NotificationEntity_Avatar,
                NotificationEntity_Phone: model.NotificationEntity_Phone,
                NotificationEntity_Email: model.NotificationEntity_Email,
                NotificationEntity_SSR: model.NotificationEntity_SSR,
            };

            NotificationEntity.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async getById(req, res) {
            const ids = Number.parseInt(req.params.id);
            NotificationEntity.findAll({
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
                const result = NotificationEntity.destroy({
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
            // const query = {};
            
            NotificationEntity.findAll({}).then(result => {
                const data = result.map(item => item.dataValues)
                return res.status(200).json({ results: data })
            });
        },
    }