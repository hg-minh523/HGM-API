

// import { json } from 'sequelize';
const user = require('../../models/User_Account')
const userInformationModel = ('../../models/User_Infor')
const { signIn,login,verify } = require('../../common/authentication')

export class userControlelr {
  async createUser(req,res){
    const model = req.body;
    if (model.password !== model.repassword) {
      return res.status(400).json({message: "Need to password and repasswrod are the same"});
    }
    const userExist = user.findOne({
      where : {
        User_Account_Name: model.username
      }
    }) 
    if(userExist){
      return res.status(400).json({message: "Username has been exited"});
    }
    const hashPassword = await signIn();
    const objectUser = {
      User_Account_Name: model.username,
      User_Account_Password: hashPassword
    }
    const userCreate = user.create(objectUser);
    if(userCreate){
      return res.status(200).json({message: "Username has been created"});
    }
  }
  async login(req,res){
    const model = req.body;
    if (!model.username || !model.password){
      return res.status(400).json({message: "Need username and password"});
    }
    const userExist = user.findOne({
      where : {
        User_Account_Name: model.username
      }
    }) 
    if(!userExist){
      return res.status(400).json({message: "User has been registed"});
    }

    const checkUser = login(model.User_Account_Password,userExist.password);
    if (checkUser){
      const inforUser = userInformationModel.findOne({
        where : {
          User_Information_Code: userExist.id
        }
      })
      const userVerify = verify(inforUser);
      return res.json({})
    }
  }
}