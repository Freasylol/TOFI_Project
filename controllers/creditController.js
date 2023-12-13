const {Credit} = require('../models/models');

class CreditController {
    async getAll(req, res) {
        return await Credit.findAll().then(type => res.json(type));
    }

    // async createAnnuitentCredit(req, res) {
    //     const {creditSize, percent, term, type, date, bankAccountId} = req.body;
    //     const credit = await credit  
    // }

    async createOne(req, res) {
        const {sum, date, term, percent, bankAccountId} = req.body;
        const credit = await Credit.create({sum, date, term, percent, bankAccountId});
        return res.json(credit);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const credit = await Credit.findOne({where: {id: id}});
        return res.json(credit);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {sum, date, term, percent, bankAccountId} = req.body;
        const credit = await Credit.update({sum, date, term, percent, bankAccountId}, {where: {id: id}});
        return res.json(credit);
    }

    async deleteOne(req, res) {
        Credit.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new DepositController();