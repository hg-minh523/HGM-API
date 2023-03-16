const userRoute = require('./User_Account.Routes');
const employeeRoute = require('./Employee.Routes');
const productRoute = require('./Products.Routes');
const productGroupRoute = require('./Product_Group.Routes');
const customerRoute = require('./Customer.Routes');
const cartRoute = require('./Cart.Routes');




module.exports = (app) => {
    app.use('/api/v1/user',userRoute);
    app.use('/api/v1/employee',employeeRoute);
    app.use('/api/v1/product',productRoute);
    app.use('/api/v1/productGroup',productGroupRoute);
    app.use('/api/v1/customer',customerRoute);
    app.use('/api/v1/cart',cartRoute);

}