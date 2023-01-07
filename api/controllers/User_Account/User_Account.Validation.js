const User = require('../../models/User_Account/User_Account.Model');

module.exports = {
    async checkBeforeCreate(model){
        const query ={
            User_Account_Name: model.Product_Code
        }
        try {
            const result = await User.findAll({
                where: query
            })
            return result.length > 0 ? 1 : 0;
        } catch (error) {
            return 0;
        }

    }
}