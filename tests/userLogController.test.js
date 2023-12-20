const userLogController = require('../controllers/userLogController');
const { UserLog } = require('../models/models');

describe('UserLogController', () => {
  // Mock the req and res objects
  const req = {};
  const res = {
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all user logs', async () => {
      const expectedUserLogs = [
        { id: 1, date: '2023-01-01', action: 'Login', userId: 1 },
        { id: 2, date: '2023-01-02', action: 'Logout', userId: 2 },
      ];

      UserLog.findAll = jest.fn().mockResolvedValue(expectedUserLogs);

      await userLogController.getAll(req, res);

      expect(UserLog.findAll).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(expectedUserLogs);
    });
  });

  describe('createOne', () => {
    it('should create a new user log', async () => {
      const requestBody = { date: '2023-01-01', action: 'Login', userId: 1 };
      const expectedUserLog = { id: 1, date: '2023-01-01', action: 'Login', userId: 1 };

      UserLog.create = jest.fn().mockResolvedValue(expectedUserLog);

      req.body = requestBody;

      await userLogController.createOne(req, res);

      expect(UserLog.create).toHaveBeenCalledTimes(1);
      expect(UserLog.create).toHaveBeenCalledWith(requestBody);
      expect(res.json).toHaveBeenCalledWith(expectedUserLog);
    });
  });

  describe('getOne', () => {
    it('should return a user log by id', async () => {
      const userLogId = 1;
      const expectedUserLog = { id: 1, date: '2023-01-01', action: 'Login', userId: 1 };

      UserLog.findOne = jest.fn().mockResolvedValue(expectedUserLog);
      req.params = { id: userLogId };

      await userLogController.getOne(req, res);

      expect(UserLog.findOne).toHaveBeenCalledTimes(1);
      expect(UserLog.findOne).toHaveBeenCalledWith({ where: { id: userLogId } });
      expect(res.json).toHaveBeenCalledWith(expectedUserLog);
    });
  });

  // Add more test cases for other methods...

});
