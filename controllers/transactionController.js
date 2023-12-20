const ApiError = require('../error/ApiError');
const { badRequest } = require('../error/ApiError');
const {Transaction, BankAccount} = require('../models/models');

class TransactionController {
    async getAll(req, res) {
        return await Transaction.findAll().then(type => res.json(type));
    }

    async createOne(req, res, next) {
        const {sum, date, DestinationBankAccountId, SenderBankAccountId, userId} = req.body;
        const destinationAcc = await BankAccount.findOne({where: {id: req.body.DestinationBankAccountId}});
        const senderAcc = await BankAccount.findOne({where: {id: req.body.SenderBankAccountId}});

        // console.log(destinationAcc.balance);
        // console.log(senderAcc.balance);

        if (destinationAcc === null) {
            return next(ApiError.badRequest('Destination acc does not exist'));
        }
        if (senderAcc === null) {
            return next(ApiError.badRequest('Sender acc does not exist'));
        }

        if (senderAcc.balance < sum) {
            return next(ApiError.badRequest('Sender dont have enough money to perform a transaction'));
        }

        senderAcc.balance -= sum;
        destinationAcc.balance += sum;
        await senderAcc.save();
        await destinationAcc.save();

        let sendId = senderAcc.id;
        let destId = destinationAcc.id;
        
        const transaction = await Transaction.create({sum, date, DestinationBankAccountId, SenderBankAccountId, userId});

        return res.json(transaction);
    }

    async findByUserId(req, res) {
        const userId = Number(req.params.userId);
        const transaction = await Transaction.findAll({
            where: {
                userId: userId
            }
        })
        return res.json(transaction);
    }

    async findTransactionByBankAccountId(req, res) {
        // const userId = Number(req.params.userId);
        // const transaction = await Transaction.findAll(
        //     {
        //         where: {
        //             {}
        //         }
        //     }
        // )
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const transaction = await Transaction.findOne({where: {id: id}});
        if (!transaction) {
            next(ApiError.badRequest('Destination acc does not exist'))
        }
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