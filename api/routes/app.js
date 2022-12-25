const userRoute = require('./User_Account.Routes')
const userInforRoute = require('./System_User_Infor.Routes')
module.exports = (app) => {
    app.use('/api/v1/user',userRoute);
    app.use('/api/v1/userInfor',userInforRoute);
}