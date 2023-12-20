const roleController = require('../controllers/roleController');
const { Role } = require('../models/models');

describe('RoleController', () => {
  let findAllMock;
  let createMock;
  let findOneMock;
  let updateMock;
  let destroyMock;

  beforeEach(() => {
    findAllMock = jest.spyOn(Role, 'findAll');
    createMock = jest.spyOn(Role, 'create');
    findOneMock = jest.spyOn(Role, 'findOne');
    updateMock = jest.spyOn(Role, 'update');
    destroyMock = jest.spyOn(Role, 'destroy');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAll', () => {
    it('should retrieve all roles', async () => {
      const roles = [{ id: 1, name: 'Admin' }];

      findAllMock.mockResolvedValueOnce(roles);
      
      const req = {};
      const res = {
        json: jest.fn(),
      };

      await roleController.getAll(req, res);

      expect(findAllMock).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(roles);
    });
  });

  describe('createOne', () => {
    it('should create a new role', async () => {
      const newRole = { name: 'Manager' };

      createMock.mockResolvedValueOnce(newRole);
      
      const req = {
        body: newRole,
      };
      const res = {
        json: jest.fn(),
      };

      await roleController.createOne(req, res);

      expect(createMock).toHaveBeenCalledWith(newRole);
      expect(res.json).toHaveBeenCalledWith(newRole);
    });
  });

  // Write similar tests for other methods (getOne, updateOne, deleteOne).

});
