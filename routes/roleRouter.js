const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.getAll);
router.post('/', roleController.createOne);
router.get('/:id', roleController.getOne);
router.put('/:id',roleController.updateOne);
router.delete('/', roleController.deleteOne);

module.exports = router;