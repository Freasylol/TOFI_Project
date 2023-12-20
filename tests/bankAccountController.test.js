const bankAccountController = require('../controllers/bankAccountController');
const { BankAccount } = require('../models/models');

describe('BankAccountController', () => {
  let BankAccountMock;

  beforeEach(() => {
    BankAccountMock = jest.spyOn(BankAccount, 'findAll');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAll', () => {
    it('should retrieve all bank accounts', async () => {
      const bankAccounts = [{ id: 1, balance: 100, userId: 1 }];

      BankAccountMock.mockResolvedValueOnce(bankAccounts);
      
      const req = {};
      const res = {
        json: jest.fn(),
      };

      await bankAccountController.getAll(req, res);

      expect(BankAccountMock).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(bankAccounts);
    });
  });

  describe('createOne', () => {
    it('should create a new bank account', async () => {
      const newBankAccount = { balance: 200, userId: 1 };

      const createMock = jest.spyOn(BankAccount, 'create').mockResolvedValueOnce(newBankAccount);
      
      const req = {
        body: newBankAccount,
      };
      const res = {
        json: jest.fn(),
      };

      await bankAccountController.createOne(req, res);

      expect(createMock).toHaveBeenCalledWith(newBankAccount);
      expect(res.json).toHaveBeenCalledWith(newBankAccount);
    });
  });

  // Write similar tests for other methods (getOne, findBankAccountByAccountId, etc.)

});
