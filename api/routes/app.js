const userRoute = require('./User_Account.Routes')
const employeeRoute = require('./Employee.Routes')
module.exports = (app) => {
    app.use('/api/v1/user',userRoute);
    app.use('/api/v1/employee',employeeRoute);
}