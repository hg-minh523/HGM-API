module.exports.genarateCode = async () => {
    try {
        const findUser = await Employee.findAll();
        const userCode = findUser[findUser.length - 1]?.dataValues.Employee_Code
        const newCode = userCode ? userCode : '';
        return autoIncrementCode(newCode,"NV")
    } catch (err) {
        // console.log(err)
    }
}