const {UserLog} = require('../models/models');

class UserLogController {
    async getUserLogs(req, res) {
        return await UserLog.findAll().then(type => res.json(type));
    }

    async createUserLog(req, res) {
        const {date, action, userId} = req.body;
        const userLog = await UserLog.create({date, action, userId});
        return res.json(userLog);
    }
}

module.exports = new UserLogController();