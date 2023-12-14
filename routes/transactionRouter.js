const Router = require('express');
const router = new Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAll);
router.post('/', transactionController.createOne);
router.post('/findByBankAccountId', transactionController.findTransactionByBankAccountId);
router.get('/:id', transactionController.getOne);
router.put('/:id',transactionController.updateOne);
router.delete('/', transactionController.deleteOne);

module.exports = router;