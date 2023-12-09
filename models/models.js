const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    passport_id: {type: DataTypes.STRING, unique: true},
    birth_date: {type: DataTypes.DATE}
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const UserLog = sequelize.define('user_log', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    action: {type: DataTypes.STRING},
})

const BankAccount = sequelize.define('bank_account', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    balance: {type: DataTypes.INTEGER}
})

const Deposit = sequelize.define('deposit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DOUBLE},
    date: {type: DataTypes.DATE},
    term: {type: DataTypes.DATE},
    procent: {type: DataTypes.DOUBLE},
})

const Credit = sequelize.define('credit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DOUBLE},
    date: {type: DataTypes.DATE},
    term: {type: DataTypes.DATE},
    procent: {type: DataTypes.DOUBLE},
})

const Transaction = sequelize.define('transaction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DOUBLE},
    date: {type: DataTypes.DATE},
})

Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(UserLog);
UserLog.belongsTo(User);

User.hasMany(BankAccount);
BankAccount.belongsTo(User);

BankAccount.hasMany(Credit);
Credit.belongsTo(BankAccount);

BankAccount.hasMany(Deposit);
Deposit.belongsTo(BankAccount);

BankAccount.hasMany(Transaction);
Transaction.belongsTo(BankAccount, {foreignKey: 'DestinationBankAccountId'});

module.exports = {
    User, 
    Role,
    UserLog,
    BankAccount,
    Deposit,
    Credit,
    Transaction
}
