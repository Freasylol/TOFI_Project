const {BankAccount} = require('../models/models');
var uuid = require('node-uuid');
const { Sequelize } = require('sequelize');

class BankAccountController {
    async getAll(req, res) {
        return await BankAccount.findAll().then(type => res.json(type));
    }

    async createOne(req, res) {
        const {balance, userId} = req.body;
        const bankAccount = await BankAccount.create({balance, userId});
        return res.json(bankAccount);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const bankAccount = await BankAccount.findOne({where: {id: id}});
        return res.json(bankAccount);
    }

    async findBankAccountByAccountId(req,res) {
        const accountId = req.params.accountId;
        console.log(accountId);
        const bankAccount = await BankAccount.findAll(
            {
                where: {
                    accountId: Sequelize.fn('uuid', accountId)
                    }
            }
        )

        return res.json(bankAccount);
    }

    async findBankAccountByUserid(req, res) {
        const userId = req.params.userId;
        const bankAccount = await BankAccount.findAll(
            {
                where: {
                    userId: userId
                }
            }
        )

        return res.json(bankAccount);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {balance, userId} = req.body;
        const bankAccount = await BankAccount.update({balance, userId}, {where: {id: id}});
        return res.json(bankAccount);
    }

    async deleteOne(req, res) {
        BankAccount.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new BankAccountController();