const Router = require('express');
const router = new Router();
const creditController = require('../controllers/creditController');

router.get('/', creditController.getAll);
router.post('/', creditController.createOne);
router.get('/:id', creditController.getOne);
router.put('/:id',creditController.updateOne);
router.delete('/', creditController.deleteOne);

module.exports = router;