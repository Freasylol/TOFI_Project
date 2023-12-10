const {UserLog} = require('../models/models');

class UserLogController {
    async getAll(req, res) {
        return await UserLog.findAll().then(type => res.json(type));
    }

    async createOne(req, res) {
        const {date, action, userId} = req.body;
        const userLog = await UserLog.create({date, action, userId});
        return res.json(userLog);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const userLog = await UserLog.findOne({where: {id: id}});
        return res.json(userLog);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {date, action, userId} = req.body;
        const userLog = await UserLog.update({date, action, userId}, {where: {id: id}});
        return res.json(userLog);
    }

    async deleteOne(req, res) {
        UserLog.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new UserLogController();