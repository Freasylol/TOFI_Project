const {Deposit} = require('../models/models');

class DepositController {
    async getAll(req, res) {
        return await Deposit.findAll().then(type => res.json(type));
    }

    async createOne(req, res) {
        const {sum, date, term, percent, received_sum, bankAccountId, userId, depositType} = req.body;
        const deposit = await Deposit.create({sum, date, term, percent, received_sum, bankAccountId, userId, depositType});
        return res.json(deposit);
    }

    async updateDeposit(req, res) {
        const id = Number(req.params.id);
        const {received_sum} = req.body;
        const deposit = await Deposit.update({received_sum}, {where: {id: id}});
        return res.json(deposit);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const deposit = await Deposit.findOne({where: {id: id}});
        return res.json(deposit);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {sum, date, term, percent, received_sum, bankAccountId, userId, depositType} = req.body;
        const deposit = await Deposit.update({sum, date, term, percent, received_sum, bankAccountId, userId, depositType}, {where: {id: id}});
        return res.json(deposit);
    }

    async getCreditByUserId(req, res) {
        const userId = req.params.userId;
        let deposit = await Deposit.findAll(
            {
                where: {
                    userId: userId
                }
            }
        )
        return res.json(deposit);
    }    

    async deleteOne(req, res) {
        Deposit.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new DepositController();