const transactionController = require('../controllers/transactionController');
const { Transaction, BankAccount } = require('../models/models');
const { ApiError } = require('../error/ApiError');

jest.mock('../models/models', () => ({
  Transaction: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  BankAccount: {
    findOne: jest.fn(),
  },
}));

jest.mock('../error/ApiError', () => ({
  badRequest: jest.fn(),
}));

describe('transactionController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('should return all transactions', async () => {
      Transaction.findAll.mockResolvedValueOnce([{ id: 1, sum: 100 }, { id: 2, sum: 200 }]);

      const req = {};
      const res = {
        json: jest.fn(),
      };

      await transactionController.getAll(req, res);

      expect(Transaction.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1, sum: 100 }, { id: 2, sum: 200 }]);
    });
  });

  

  describe('deleteOne', () => {
    test('should delete a single transaction by id', async () => {
      const req = {
        body: {
          id: 1,
        },
      };
      const res = {};

      await transactionController.deleteOne(req, res);

      expect(Transaction.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});