const db = require('../connection')
const model = require('../model/account.model')
const { QueryTypes } = require('sequelize');
class accountRepository {
  constructor(){
    this.model = model
  }


  async register({ User_Account_Name, User_Account_Password, User_Account_Permission, Status
  }) {
    const result = await db.query("insert into accounts (User_Account_Name,User_Account_Password, User_Account_Permission, Status, createdAt, updatedAt) values (:name, :password, :permission, :status, :create, :update)",
      {
        replacements: {
          name: User_Account_Name,
          password: User_Account_Password,
          permission: User_Account_Permission,
          status: Status,
          create: new Date(),
          update: new Date()
        },
        type: QueryTypes.INSERT,
      }
    );
    return result;
  }

  async findOne(id) {
    const result = await db.query("Select * from User where User_Account_Name =:id",
      {
        replacements: {
          User_Account_Name: id,
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  async update({ User_Account_Name, User_Account_Permission, User_Account_Password, Status }) {
    const result = await accountModel.query("update user set Status =:Status, User_Account_Permission =: User_Account_Permission, User_Account_Password =: User_Account_Password where User_Account_Name =: User_Account_Name",
      {
        replacements: {
          User_Account_Permission,
          User_Account_Password,
          User_Account_Name,
          Status
        },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  }

  async delete({ User_Account_Name }) {
    const result = await db.query("delete from user where User_Account_Name =: User_Account_Name",
      {
        replacements: {
          User_Account_Name: User_Account_Name,
        },
        type: QueryTypes.DELETE,
      }
    );
    return result;
  }

  async findAll() {
    const result = await accountModel.query("select ́* from user",
      {
        type: QueryTypes.DELETE,
      }
    );
    return result;
  }
}
module.exports = accountRepository;