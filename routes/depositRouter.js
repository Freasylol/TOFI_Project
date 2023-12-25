const Router = require('express');
const router = new Router();
const depositController = require('../controllers/depositController');

router.get('/', depositController.getAll);
router.post('/', depositController.createOne);
router.get('/findByUserId/:userId', depositController.getCreditByUserId);
router.get('/:id', depositController.getOne);
router.put('/:id',depositController.updateOne);
router.delete('/', depositController.deleteOne);

module.exports = router;