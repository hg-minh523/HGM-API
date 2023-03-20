const { verifyUser } = require('../../common/authentication');
const PostEntity = require('../../models/Post/Post.Model');
    module.exports = {
        async create(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const model = req.body
            try {
                const result = PostEntity.create(model);
                if(!!result){
                    return res.status(200).json({msg: "sucees"});
                }else {
                    return res.status(401).json({msg: "failt"});

                }
            } catch (error) {

            }
        },
        async update(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const model = req.body;
            const query = { id: model.id }
            const valueUpdate = {
                Post_Name: model.Post_Name,
                Post_Title: model.Post_Title,
                Post_Content: model.Post_Content,
                Post_Detail: model.Post_Detail,
                status: model.status
            };
          
            PostEntity.update(valueUpdate, {
                where: query
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },
        async getById(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.params.id;

            PostEntity.findAll({
                where: {
                    id: ids
                }
            }).then(result => {
                return res.status(200).json({ data: result[0].dataValues })
            });
        },

        async delete(req, res) {
            const user = await verifyUser(req.headers.authorization);
            const ids = req.params.id;
            try {
                const result = PostEntity.destroy({
                    where: {id:ids}
                });
                if(!!result){
                    return res.status(200).json({msg: "sucees"});
                }else {
                    return res.status(401).json({msg: "failt"});

                }
            } catch (error) {

            }
        },

        async search(req, res) {
            const model = req.body;
            const query = {};
            if (!!model.Post_Code ){
                query.Post_Code = model.Post_Code
            }
            if (!!model.Post_Name ){
                query.Post_Name = model.Post_Name
            }
            if (!!model.status ){
                query.status = model.status
            }
            PostEntity.findAll({
              where: query
            }).then(result => {
            const data= result.map(item => item.dataValues)
              return res.status(200).json({ results:data })
            });
          },
    }