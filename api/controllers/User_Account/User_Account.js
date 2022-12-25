const { comparePassword } = require('../../common/authentication')
const UserSchema = require('../../models/User_Account/User_Account.Model')
const jwt = require("jsonwebtoken")
module.exports =  {
  async  register(req,res) {
    const model = req.body;
    if (!model.User_Account_Name || !model.User_Account_Password){
      return res.status(400).json({msg: "Fail to register account"});
    }
    UserSchema.create(model).then(result => {
      res.status(200).json({mg:"sucees"});
    })
  },
  async login(req,res) {
    const model = req.body;
    if (!model.User_Account_Name || !model.User_Account_Password){
      return res.status(400).json({msg: "Fail to  login"});
    }
    UserSchema.findOne({where: {
      User_Account_Name: model.User_Account_Name
    }}).then(async result=>{
      const user = result.dataValues
      const compare = await comparePassword(user.User_Account_Password, model.User_Account_Password)
      if(!!compare){
        delete user.User_Account_Password;
        return res.status(200).json({token: jwt.sign(user, process.env.PRIVATEKEY, {expiresIn: '24h'})});
      }else {
        return res.status(400).json({msg:"wrong password"})
      }
    }
    )
  },
}