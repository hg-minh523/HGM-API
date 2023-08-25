const { verifyUser } = require('../../common/authentication');
const Employee = require('../../models/Employee/Employee.Model');
const { autoIncrementCode } = require('../../common/CommonMethod');
const jwt = require("jsonwebtoken")
const genarateCode = async () => {
    try {
        const findUser = await Employee.findAll();
        const userCode = findUser[findUser.length - 1]?.dataValues.Employee_Code
        const newCode = userCode ? userCode : '';
        return autoIncrementCode(newCode, "NV")
    } catch (err) {
        // console.log(err)
    }
}

class employeeRepository {
    async create({
        Employee_Name,
        Employee_BirthDay,
        Employee_Avatar,
        Employee_Phone,
        Employee_Email,
        Employee_CI,
        Employee_Creator,
        Status
    }) {
        const result = await Sequelize.query("insert into employee (Employee_Name, Employee_Birthday, Employee_Avatar ,Employee_Phone, Employee_Email,Employee_CI,"+
        "Employee_Creator,Status) values (:Employee_Name, :Employee_Birthday, :Employee_Avatar ,:Employee_Phone, :Employee_Email,:Employee_CI,"+
        ":Employee_Creator,: Status)",
        {
          type: Sequelize.QueryTypes.DELETE,
          replaceMent: {
            Employee_Name: Employee_Name,
            Employee_BirthDay: Employee_BirthDay,
            Employee_Avatar: Employee_Avatar,
            Employee_Phone: Employee_Phone,
            Employee_Email: Employee_Email,
            Employee_CI:Employee_CI ,
            Employee_Creator: Employee_Creator,
            Status: Status
          }
        }
      );
      return result;
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
module.exports = employeeRepository