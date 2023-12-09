const {BankAccount} = require('../models/models');

class BankAccountController {
    async getBankAccounts(req, res) {
        return await BankAccount.findAll().then(type => res.json(type));
    }

    async createBankAccount(req, res) {
        const {balance, userId} = req.body;
        const role = await BankAccount.create({balance, userId});
        return res.json(role);
    }
}

module.exports = new BankAccountController();