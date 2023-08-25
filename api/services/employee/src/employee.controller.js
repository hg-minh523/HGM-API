
const employeeService = require('./account.service');
const { formatData } = require('../utils/utils')
// channel is MQ service
module.exports = (app, channel) => {

    const service = new accountService();

    app.post('/create', (req, res) => {
        const token = req.cookies.accessToken;
        const model = req.body
        // const inputEmployee = { Employee_Code, Employee_}
        // const user =await verifyUser(token);
        // model.Employee_Account = user.User_Account_Name
        // model.Employee_Code = await genarateCode();
        // model.Employee_Creator = user.id;
        return formatData(service.login(accountInputs, res), res);
       
    });

    app.post('/login', (req, res) => {
        const accountInputs = { User_Account_Name, User_Account_Password } = req.body;
        return formatData(service.login(accountInputs, res), res);
    });

    app.put('/update', (req, res) => {
        const accountInputs = { User_Account_Password, User_Account_Permission, Status } = req.body;
        return formatData(service.update(accountInputs), res);
    });

    app.get('/getById', (req, res) => {
        const { User_Account_Name } = req.body;
        return formatData(service.update(User_Account_Name, res));
    });

    app.get('/refreshToken', (req, res) => {
        const { refreshToken } = req.cookies.refreshToken;
        return formatData(service.refreshToken(refreshToken, res), res);
    });
    
    app.delete('/delete', (req, res) => {
        const { User_Account_Name } = req.body;
        return formatData(service.refreshToken(User_Account_Name), res);
    });
}
