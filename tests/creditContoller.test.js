const сreditController = require('../controllers/creditController');
const { Credit } = require('../models/models');

describe('сreditController', () => {
  // Mock the req and res objects
  const req = {};
  const res = {
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all credits', async () => {
      const expectedCredits = [{ id: 1, sum: 1000 }, { id: 2, sum: 2000 }];

      Credit.findAll = jest.fn().mockResolvedValue(expectedCredits);

      await сreditController.getAll(req, res);

      expect(Credit.findAll).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(expectedCredits);
    });
  });

  describe('createOne', () => {
    it('should create a new credit', async () => {
      const requestBody = { sum: 1000, date: '2023-01-01' };
      const expectedCredit = { id: 1, sum: 1000, date: '2023-01-01' };

      Credit.create = jest.fn().mockResolvedValue(expectedCredit);

      req.body = requestBody;

      await сreditController.createOne(req, res);

      expect(Credit.create).toHaveBeenCalledTimes(1);
      expect(Credit.create).toHaveBeenCalledWith(requestBody);
      expect(res.json).toHaveBeenCalledWith(expectedCredit);
    });
  });

  describe('getOne', () => {
    it('should return a credit by id', async () => {
      const creditId = 1;
      const expectedCredit = { id: 1, sum: 1000 };

      Credit.findOne = jest.fn().mockResolvedValue(expectedCredit);
      req.params = { id: creditId };

      await сreditController.getOne(req, res);

      expect(Credit.findOne).toHaveBeenCalledTimes(1);
      expect(Credit.findOne).toHaveBeenCalledWith({ where: { id: creditId } });
      expect(res.json).toHaveBeenCalledWith(expectedCredit);
    });
  });

});
