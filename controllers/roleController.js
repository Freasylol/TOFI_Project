const {Role} = require('../models/models');

class RoleController {
    async getRoles(req, res) {
        return await Role.findAll().then(type => res.json(type));
    }

    async createRole(req, res) {
        const {name} = req.body;
        const role = await Role.create({name});
        return res.json(role);
    }
}

module.exports = new RoleController();