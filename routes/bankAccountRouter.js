const Router = require('express');
const router = new Router();
const bankAccountController = require('../controllers/bankAccount');

router.get('/', bankAccountController.getBankAccounts);
router.post('/', bankAccountController.createBankAccount);

module.exports = router;