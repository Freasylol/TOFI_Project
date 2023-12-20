const Router = require('express');
const router = new Router();
const creditController = require('../controllers/creditController');

router.get('/', creditController.getAll);
router.get('/findByUserId/:userId', creditController.getCreditByUserId);
router.post('/', creditController.createOne);
router.get('/:id', creditController.getOne);
router.put('/sum/:id', creditController.updateSum);
router.put('/:id',creditController.updateOne);
router.delete('/', creditController.deleteOne);

module.exports = router;