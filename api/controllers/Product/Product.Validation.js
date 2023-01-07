const Products = require('../../models/Products/Products.Model');

module.exports = {
    async checkBeforeCreate(model){
        const query ={
            Product_Code: model.Product_Code
        }
        try {
            const result = await Products.findAll({
                where: query
            })
            return result.length > 0 ? 1 : 0;
        } catch (error) {
            return 0;
        }

    }
}