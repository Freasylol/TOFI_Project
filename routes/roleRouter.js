const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);

module.exports = router;