const { comparePassword, verifyUser } = require('../../common/authentication');
const UserSchema = require('../../models/User_Account/User_Account.Model');
const User_AccountValidation = require('./User_Account.Validation'); 
const jwt = require("jsonwebtoken")

module.exports = {

  async register(req, res) {
    const model = req.body;
    if (!model.User_Account_Name || !model.User_Account_Password) {
      return res.status(400).json({ msg: "Fail to register" });
    }
    const validateResult = await User_AccountValidation.checkBeforeCreate(model);
    if(validateResult === 1){
        return res.status(400).json({msg: "duplicate product code"});
    }
    UserSchema.create(model).then(result => {
      return result
    }).then(data => {
      data.setEmployee(model.Employee_Code);
      res.status(200).json(data); 
    }).catch(e => {
      return res.status(404).json(e)
    })
  },

  async login(req, res) {
    const model = req.body;
    if (!model.User_Account_Name || !model.User_Account_Password) {
      return res.status(400).json({ msg: "Fail to  login" });
    }
    UserSchema.findOne({
      where: {
        User_Account_Name: model.User_Account_Name
      }
    }).then(async result => {
      const user = result.dataValues
      const compare = await comparePassword(user.User_Account_Password, model.User_Account_Password)
      if (!!compare) {
        delete user.User_Account_Password;
        return res.status(200).json({ token: jwt.sign(user, process.env.PRIVATEKEY, { expiresIn: '24h' }) });
      } else {
        return res.status(400).json({ msg: "wrong password" })
      }
    })
    .catch(err => {
      return res.status(404).json({ msg: "User is not found" })
    })
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
    UserSchema.findAll({
      where: query
    }).then(result => {
      console.log(result)
      return res.status(200).json(result)
    });
  },
  async update(req, res) {
    const user = await verifyUser(req.headers.authorization);
    const model = req.body;
    const query = { id: model.id }
    console.log('datadasdawdawdawdawdawdawdawdaw', model);
    const valueUpdate = {
      User_Account_Permission: model.User_Account_Permission,
      User_Account_Password: model.User_Account_Password
    };

    UserSchema.update(valueUpdate, {
      where: query
    }).then(result => {
      return res.status(200).json({ data: result })
    });
  },
  async delete(req, res) {
    const user = await verifyUser(req.headers.authorization);
    const ids = req.body.ids;
    UserSchema.destroy({
      where: {
        id: ids
      }
    }).then(result => {
      return res.status(200).json(result)
    });
  },
  async getById(req, res) {
    const user = await verifyUser(req.headers.authorization);
    const ids = req.params.id;
    UserSchema.findAll({
      where: {
        id: ids
      }
    }).then(result => {
      return res.status(200).json(result[0])
    });
  }
}