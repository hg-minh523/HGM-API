import System_User from './System_User.Routes'
exports.module = (app:any) => {
    app.use('register',System_User.register)
}