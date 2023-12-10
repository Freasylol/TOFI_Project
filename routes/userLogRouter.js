const Router = require('express');
const router = new Router();
const userLogController = require('../controllers/userLogController');

router.get('/', userLogController.getAll);
router.post('/', userLogController.createOne);
router.get('/:id', userLogController.getOne);
router.put('/:id',userLogController.updateOne);
router.delete('/', userLogController.deleteOne);

module.exports = router;