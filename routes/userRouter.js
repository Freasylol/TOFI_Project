const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');

router.get('/', userController.getAll);
router.post('/verify', userController.verify);
router.post('/login', userController.login);
router.get('/auth', checkAuthMiddleware, userController.check)
router.get('/:id', userController.getOne);
router.put('/:id',userController.updateOne);
router.delete('/', userController.deleteOne);
router.post('/', userController.createOne);

module.exports = router;