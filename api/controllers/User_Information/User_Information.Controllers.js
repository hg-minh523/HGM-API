const { verifyUser } = require('../../common/authentication')
const User_InforShema = require('../../models/User_Infor/User_Infor.Model')
module.exports = {
    async create(req,res){
        const user = await verifyUser(req.headers.authorization);
        const model = req.body
        model.User_Information_Code = user.User_Account_Name
        User_InforShema.create(model)
        .then(() => {
            return res.status(200).json({msg: "sucees"});
        })
        .catch(err => {
            return res.status(400).json({false: "false",error:err});
        })
    }
}