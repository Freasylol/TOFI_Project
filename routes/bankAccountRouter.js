const Router = require('express');
const router = new Router();
const bankAccountController = require('../controllers/bankAccountController');

router.get('/', bankAccountController.getAll);
router.get('/findByUserId/:userId', bankAccountController.findBankAccountByUserid);
router.get('/findByAccountId/:accountId', bankAccountController.findBankAccountByAccountId);
router.post('/', bankAccountController.createOne);
router.get('/:id', bankAccountController.getOne);
router.put('/:id',bankAccountController.updateOne);
router.delete('/', bankAccountController.deleteOne);

module.exports = router;