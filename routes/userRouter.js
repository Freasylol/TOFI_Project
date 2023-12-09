const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');

router.get('/', userController.getUsers);
router.post('/login', userController.login);
router.get('/auth', checkAuthMiddleware, userController.check)
// router.get('/check', userController.check);
router.get('/:id', userController.getOneUser);
router.put('/:id',userController.updateUser);
router.post('/', userController.createUser);

module.exports = router;