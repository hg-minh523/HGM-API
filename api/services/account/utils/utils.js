// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const {
//   APP_SECRET,
//   EXCHANGE_NAME,
//   CUSTOMER_SERVICE,
//   MSG_QUEUE_URL,
// } = require("../account.config");
// const User = require('../../models/User_Account/User_Account.Model');

// module.exports.checkBeforeCreate =  async (model) => {
//         const query ={
//             User_Account_Name: model.Product_Code
//         }
//         try {
//             const result = await User.findAll({
//                 where: query
//             })
//             return result.length > 0 ? 1 : 0;
//         } catch (error) {
//             return 0;
//         }
//  }

// //Utility functions
module.exports.clearCookie = ({ res, msg }) => {
  for (msg in arr) {
    res.clearCookie(msg);
  }
  return true;
}

module.exports.setCookie = ({ res, msg, data }) => {
  res.cookie(msg, `${data}`, {
    httpOnly: true,
    secure: true,
    port: process.env.PORT,
    domain: 'localhost',
    Path: "/"
  }
  );
}
// module.exports.GenerateSalt = async () => {
//   return await bcrypt.genSalt();
// };
module.exports.generateToken = async ({ user, time }) => {
  return { token: jwt.sign(user, process.env.PRIVATEKEY, { expiresIn: time }) }
}
// module.exports.GeneratePassword = async (password, salt) => {
//   return await bcrypt.hash(password, salt);
// };

module.exports.validatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

// module.exports.GenerateSignature = async (payload) => {
//   try {
//     return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// module.exports.ValidateSignature = async (req) => {
//   try {
//     const signature = req.get("Authorization");
//     console.log(signature);
//     const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
//     req.user = payload;
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

module.exports.formatData = (data, res) => {
  if (data) {
    return res.status(200).json({ data });
  } else {
    throw new Error("Data Not found!");
  }
};

