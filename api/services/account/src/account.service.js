const { accountRepository } = require("../database");
const { formDate, generateToken } = require("../utils");
const { setCookie, clearCookie } = require("../utils/utils");

// All Business logic will be here
class accountService {

  constructor() {
    this.repository = new accountRepository();
  }

  async logOut(res) {
    return clearCookie(["refreshToken","accessToken"]);
  }

  async register(accountInputs) {
    return await this.repository.register(accountInputs);
  }

  async login(req, res) {
    const model = req.body;
    const user = await this.repository.findOne(id);
    const compare = await validatePassword(user.User_Account_Password, model?.User_Account_Password)
    if (!!compare) {
      delete user.User_Account_Password;
      const refreshToken = generateToken(user,"30day");
      const accessToken = generateToken(user,"24h");
      setCookie(res, "refreshToken", refreshToken.token)
      setCookie(res, "accessToken", accessToken.token)
      return user;
    }
  }

  async refreshToken(token, res) {
    try {
      const user = await jwt.verify(token, process.env.PRIVATEKEY, function (err, decoded) {
        if (decoded) {
          const body = {
            id,
            User_Account_Name,
            User_Account_Permission,
            Status,
            createdAt,
            updatedAt,
            employeeId,
          } = decoded
          return body
        }
      });

      if (!user) {
        return { msg : "token is expired"}
      }
      const newToken =  generateToken(user,"24h");
      setCookie(res, "accessToken", newToken.token);
      return { msg: "refresh success" };
    } catch (error) {
      throw error;
    }
  }

  async search() {
    return this.repository.findAll();
  }

  async update(accountInputs) {
    return this.repository.update(accountInputs);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async getById(id) {
    return this.repository.findOne(id);
  }
}

module.exports = accountService;