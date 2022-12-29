const { verifyUser } = require('../../common/authentication')
const User_InforShema = require('../../models/User_Infor/User_Infor.Model')
module.exports = {
    async create(req, res) {
        const user = await verifyUser(req.headers.authorization);
        const model = req.body
        model.User_Information_Code = user.User_Account_Name
        User_InforShema.create(model)
            .then(() => {
                return res.status(200).json({ msg: "sucees" });
            })
            .catch(err => {
                return res.status(400).json({ false: "false", error: err });
            })
    },
    async update(req, res) {
        const user = await verifyUser(req.headers.authorization);
        const query = { id: user.id }
        const model = req.body;
        const valueUpdate = {};
        if (!!model.User_Information_Name) {
            valueUpdate.User_Information_Name = model.User_Information_Name;
        }
        if (!!model.User_Information_Address) {
            valueUpdate.User_Information_Address = model.User_Information_Address;

        }
        if (!!model.User_Information_Email) {
            valueUpdate.User_Information_Email = model.User_Information_Email;

        }
        if (!!model.User_Information_Name) {
            valueUpdate.User_Information_Name = model.User_Information_Name;

        }
        User_InforShema.update(valueUpdate, {
            where: query
        }).then(result => {
            return res.status(200).json({ data: result[0].dataValues })
        });
    },
    async getById(req, res) {
        const user = await verifyUser(req.headers.authorization);
        const ids = req.params.id;
        User_InforShema.findAll({
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
        User_InforShema.destroy({
            where: {
                id: ids
            }
        }).then(result => {
            return res.status(200).json({ data: result[0].dataValues })
        });
    }
}