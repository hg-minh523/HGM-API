const { comparePassword, verifyUser } = require('../../common/authentication');
const UserSchema = require('../../models/User_Account/User_Account.Model');
const User_AccountValidation = require('./User_Account.Validation');
const jwt = require("jsonwebtoken")

module.exports = {
  async logOut(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({msg: "suceess"});
  },

  async register(req, res) {
    const model = req.body;
    if (!model.User_Account_Name || !model.User_Account_Password) {
      return res.status(400).json({ msg: "Fail to register" });
    }
    const validateResult = await User_AccountValidation.checkBeforeCreate(model);
    if (validateResult === 1) {
      return res.status(400).json({ msg: "duplicate product code" });
    }
    UserSchema.create(model).then(result => {
      return result
    }).then(data => {
      data.setEmployee(model.Employee_Code);
    }).then(data => {
      res.status(200).json({ msg: "Sucees" });
    })
  },

  async login(req, res) {
    const model = req.body;
    if (!model.User_Account_Name || !model.User_Account_Password) {
      return res.status(400).json({ msg: "Fail to  login" });
    }

    UserSchema.findOne({
      where: {
        User_Account_Name: model?.User_Account_Name,
      }
    }).then(async result => {
      const user = result?.dataValues
      const compare = await comparePassword(user.User_Account_Password, model?.User_Account_Password)
      if (!!compare) {
        delete user.User_Account_Password;
        const refreshToken = { token: jwt.sign(user, process.env.PRIVATEKEY, { expiresIn: '30day' }) };
        const accessToken = { token: jwt.sign(user, process.env.PRIVATEKEY, { expiresIn: '24h' }) };
        res.cookie("refreshToken", `${refreshToken.token}`, {
          httpOnly: true,
          secure: true,
          port: "4000",
          domain: 'localhost',
          Path: "/"
        }
        );
        res.cookie("accessToken", `${accessToken.token}`, {
          httpOnly: true,
          secure: true,
          port: "4000",
          domain: 'localhost',
          Path: "/"
        }
        );

        return res.status(200).json({ refreshToken, accessToken });
      } else {
        return res.status(400).json({ msg: "wrong password" })
      }
    })
      .catch(err => {
        console.log(err)
        return res.status(404).json({ msg: "User is not found" })
      })
  },

  async refreshToken(req,res) {
    try {
      const token = req.cookies.refreshToken;
      const user = await jwt.verify(token,  process.env.PRIVATEKEY,function(err,decoded){
        if (decoded) {
          const body = {
            id: decoded.id,
            User_Account_Name: decoded.User_Account_Name,
            User_Account_Permission: decoded.User_Account_Permission,
            Status: decoded.Status,
            createdAt: decoded.createdAt,
            updatedAt: decoded.updatedAt,
            employeeId: decoded.employeeId,

          }
          return body
        }
        if (err){
          return false;
        }
      });
      if (!user){
        res.json({msg:'refreshToken is expired' })
      }
      
      console.log(user)
      const newToken = jwt.sign(user, process.env.PRIVATEKEY, { expiresIn: '24h' });
      res.cookie("accessToken", newToken, {
        httpOnly: true,
        secure: true,
        port: "4000",
        domain: 'localhost',
        Path: "/"
      });
      return res.json({msg: "refresh success"});
    } catch (error) {
      throw error;
    }
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
      return res.status(200).json({ data: result[0].dataValues })
    });
  },

  async getUserInformation(req, res) {
    const token = req.cookies.accessToken;
    if (!!token) {
      const user = await jwt.verify(token, 'secret',function(err,decoded){
        if(err){
          return false;
        }
        return decoded
      });
      if(!user){
        return res.json({msg : 'Token Expired'})
      }
      return res.status(200).json(user);
    }
  },

  async update(req, res) {
    const user = await verifyUser(req.headers.authorization);
    const model = req.body;
    const query = { id: model.id }
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