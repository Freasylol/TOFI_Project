const {Credit, BankAccount} = require('../models/models');
const { findBankAccountByUserid } = require('./bankAccountController');

class CreditController {
    async getAll(req, res) {
        return await Credit.findAll().then(type => res.json(type));
    }

    // async createAnnuitentCredit(req, res) {
    //     const {creditSize, percent, term, type, date, bankAccountId} = req.body;
    //     const credit = await Credit.create({})
    //     return res.json(credit);
    // }

    async createOne(req, res) {
        const {sum, date, term, percent, debt, payed, type, bankAccountId, userId, body} = req.body;
        const credit = await Credit.create({sum, date, term, percent, debt, payed, type, bankAccountId, userId, body});
        return res.json(credit);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const credit = await Credit.findOne({where: {id: id}});
        return res.json(credit);
    }

    async updateSum(req, res) {
        const id = Number(req.params.id);
        const {payed, body} = req.body;
        const credit = await Credit.update({payed, body}, {where: {id: id}});
        return res.json(credit);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {sum, date, term, percent, debt, payed, type, bankAccountId, body} = req.body;
        const credit = await Credit.update({sum, date, term, percent, debt, payed, type, bankAccountId, userId, body}, {where: {id: id}});
        return res.json(credit);
    }

    async getCreditByUserId(req, res) {
        const userId = req.params.userId;
        let credit = await Credit.findAll(
            {
                where: {
                    userId: userId
                }
            }
        )
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

module.exports = new CreditController();