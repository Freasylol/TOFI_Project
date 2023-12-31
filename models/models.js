const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
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
    accountId: {type: DataTypes.UUID, defaultValue: sequelize.literal('uuid_generate_v4()'), allowNull: false},
    balance: {type: DataTypes.DOUBLE},
})

const Deposit = sequelize.define('deposit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DOUBLE},
    date: {type: DataTypes.DATE},
    term: {type: DataTypes.INTEGER},
    percent: {type: DataTypes.DOUBLE},
    received_sum: {type: DataTypes.DOUBLE},
    depositType: {type: DataTypes.STRING},
})

const Credit = sequelize.define('credit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DOUBLE},
    creditId: {type: DataTypes.UUID, defaultValue: sequelize.literal('uuid_generate_v4()'), allowNull: false},
    term: {type: DataTypes.INTEGER},
    payed: {type: DataTypes.DOUBLE},
    percent: {type: DataTypes.DOUBLE},
    debt: {type: DataTypes.DOUBLE},
    type: {type: DataTypes.STRING},
    body: {type: DataTypes.DOUBLE}
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
User.hasMany(Credit);
Credit.belongsTo(User);

BankAccount.hasMany(Deposit);
Deposit.belongsTo(BankAccount);
User.hasMany(Deposit);
Deposit.belongsTo(User);


BankAccount.hasMany(Transaction, {foreignKey: 'DestinationBankAccountId'});
BankAccount.hasMany(Transaction, {foreignKey: 'SenderBankAccountId'});
Transaction.belongsTo(BankAccount, {foreignKey: 'DestinationBankAccountId'});
Transaction.belongsTo(BankAccount, {foreignKey: 'SenderBankAccountId'});
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
    User, 
    Role,
    UserLog,
    BankAccount,
    Deposit,
    Credit,
    Transaction
}
