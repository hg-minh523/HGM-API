
const  jwt = require('jsonwebtoken');

interface User {
    System_User_Email: string,
    System_User_PassWord: string,
    System_User_Account: string
}
const registerUser = (value: User) => {
    var token = jwt.sign(value, process.env.PRIVATEKEY, { expiresIn: 60 * 60 },(err:any,token: any) => {
        console.log(err,token)
    });
}
interface userInforVerify{
    token:string,
    infor: object;
}
const verifyUser = (value:userInforVerify) => {
    // const decode = 
}
module.exports = {
    registerUser
}