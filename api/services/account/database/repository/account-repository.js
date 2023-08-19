const Sequelize = require('sequelize');
class accountRepository {

  async register({ User_Account_Name, User_Account_Password, User_Account_Permission, Status
  }) {
    const result = await Sequelize.query("insert into user (User_Account_Name,User_Account_Password, User_Account_Permission, Status) values (:User_Account_Name,:User_Account_Password, :User_Account_Permission, :Status)",
      {
        replacements: {
          User_Account_Name: User_Account_Name,
          User_Account_Password: User_Account_Password,
          User_Account_Permission: User_Account_Permission,
          Status: Status
        },
        type: Sequelize.QueryTypes.INSERT,
      }
    );
    return result;
  }

  async findOne(id) {
    const result = await Sequelize.query("Select * from User where User_Account_Name =:id",
      {
        replacements: {
          User_Account_Name: id,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  }

  async update({ User_Account_Name, User_Account_Permission, User_Account_Password, Status }) {
    const result = await Sequelize.query("update user set Status =:Status, User_Account_Permission =: User_Account_Permission, User_Account_Password =: User_Account_Password where User_Account_Name =: User_Account_Name",
      {
        replacements: {
          User_Account_Permission: User_Account_Permission,
          User_Account_Password: User_Account_Password,
          User_Account_Name: User_Account_Name,
          Status: Status
        },
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
    return result;
  }

  async delete({ User_Account_Name }) {
    const result = await Sequelize.query("delete from user where User_Account_Name =: User_Account_Name",
      {
        replacements: {
          User_Account_Name: User_Account_Name,
        },
        type: Sequelize.QueryTypes.DELETE,
      }
    );
    return result;
  }

  async findAll() {
    const result = await Sequelize.query("select ́* from user",
      {
        type: Sequelize.QueryTypes.DELETE,
      }
    );
    return result;
  }
}
module.exports = accountRepository;