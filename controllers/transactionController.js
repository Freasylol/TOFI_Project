const {Transaction} = require('../models/models');

class TransactionController {
    async getAll(req, res) {
        return await Transaction.findAll().then(type => res.json(type));
    }

    async createOne(req, res) {
        const {sum, date, DestinationBankAccountId,SenderBankAccountId} = req.body;
        const transaction = await Transaction.create({sum, date, DestinationBankAccountId,SenderBankAccountId});
        return res.json(transaction);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const transaction = await Transaction.findOne({where: {id: id}});
        return res.json(transaction);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {sum, date, DestinationBankAccountId,SenderBankAccountId} = req.body;
        const transaction = await Transaction.update({sum, date, DestinationBankAccountId,SenderBankAccountId}, {where: {id: id}});
        return res.json(transaction);
    }

    async deleteOne(req, res) {
        Transaction.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new TransactionController();