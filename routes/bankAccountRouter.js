const Router = require('express');
const router = new Router();
const bankAccountController = require('../controllers/bankAccountController');

router.get('/', bankAccountController.getAll);
router.post('/', bankAccountController.createOne);
router.get('/:id', bankAccountController.getOne);
router.put('/:id',bankAccountController.updateOne);
router.delete('/', bankAccountController.deleteOne);

module.exports = router;