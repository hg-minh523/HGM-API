const { verifyUser } = require('../../common/authentication');
const Employee = require('../../models/Employee/Employee.Model');
const { genarateCode } = require('../utils/utils')
const { autoIncrementCode } = require('../../common/CommonMethod');
const accountRepository = require('../database/repository/employee-repository')
const jwt = require("jsonwebtoken")

class employeeService {
    constructor() {
        this.repository = new accountRepository();
      }

      async create(model) {
        const user =await verifyUser(token);
        model.Employee_Account = user.User_Account_Name
        model.Employee_Code = await genarateCode();
        model.Employee_Creator = user.id;
        return this.repository.create(model);
    }

    async update(req, res) {
        const user = await verifyUser(req.cookies.accessToken);
        const model = req.body;
        const query = { id: model.id }
        const valueUpdate = {
            Employee_Name: model.Employee_Name,
            Employee_Avatar: model.Employee_Avatar,
            Employee_Phone: model.Employee_Phone,
            Employee_Email: model.Employee_Email,
            Employee_SSR: model.Employee_SSR,
            
        };

        Employee.update(valueUpdate, {
            where: query
        }).then(result => {
            return res.status(200).json({ data: result[0].dataValues })
        });
    }
    async getById(req, res) {
        const ids = Number.parseInt(req.params.id);
        Employee.findAll({
            where: {
                id: ids
            }
        }).then(result => {
            return res.status(200).json({ data: result[0].dataValues })
        });
    }

    async delete(req, res) {
        const user = await verifyUser(req.headers.authorization);
        const ids = req.params.id;
        try {
            const result = Employee.destroy({
                where: { id: ids }
            });
            if (!!result) {
                return res.status(200).json({ msg: "sucees" });
            } else {
                return res.status(401).json({ msg: "failt" });

            }
        } catch (error) {

        }
    }

    async search(req, res) {
        const model = req.body;
        const query = {};
        if (!!model.Employee_Code) {
            query.Employee_Code = model.Employee_Code
        }

        if (!!model.Employee_Name) {
            query.Employee_Name = model.Employee_Name
        }

        if (!!model.Employee_CI) {
            query.Employee_CI = model.Employee_CI
        }

        if (!!model.Employee_Email) {
            query.Employee_Email = model.Employee_Email
        }

        if (!!model.Employee_Phone) {
            query.Employee_Phone = model.Employee_Phone
        }

        if (!!model.status) {
            query.status = model.status
        }
        Employee.findAll({
            where: query
        }).then(result => {
            const data = result.map(item => item.dataValues)
            return res.status(200).json({ results: data })
        });
    }
}
module.exports = employeeService