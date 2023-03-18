const CartDetailEntity = require('../../models/Cart_Detail/Cart_Detail.model');
const sequelize = require("../../database/Database");
const moment = require("moment")
const { Op } = require("sequelize");
module.exports = {
    async revenueReport(req, res) {
        const type = req.body.Report_Type;
        const query = {}

        if (!!req.body.Report_Time && req.body.Report_Time.length > 0) {
            const startDate =  moment(req.body.Report_Time[0]).format("YYYY-MM-DD")

            const endDate =  moment(req.body.Report_Time[1]).format("YYYY-MM-DD")

            query.createdAt = {
                [Op.lte] :endDate,
                [Op.gte]: startDate
            }
        }
        let format = ''
        switch (type) {
            case "Day":
                format = '%d-%m-%Y'
                break;
            case "Month":
                format = '%m-%Y'
                break;
            case "Year":
                format = '%Y'
                break;

            default:
                break;
        }
        await CartDetailEntity.findAll({
            where: query,
            attributes: [
                [sequelize.fn('date_format', sequelize.col('createdAt'), format), 'Report_Time'],
                [sequelize.fn('SUM', sequelize.col('Cart_Detail_Price')), "Report_Value"]],
            group: "Report_Time"
        }).then(result => {
            const data= result.map(item => item.dataValues)
              return res.status(200).json({ results:data })
        })
    },
}