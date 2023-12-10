const {Role} = require('../models/models');

class RoleController {
    async getAll(req, res) {
        return await Role.findAll().then(type => res.json(type));
    }

    async createOne(req, res) {
        const {name} = req.body;
        const role = await Role.create({name});
        return res.json(role);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const role = await Role.findOne({where: {id: id}});
        return res.json(role);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {name} = req.body;
        const role = await Role.update({name}, {where: {id: id}});
        return res.json(role);
    }

    async deleteOne(req, res) {
        Role.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new RoleController();