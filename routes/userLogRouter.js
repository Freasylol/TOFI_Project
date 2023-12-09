const Router = require('express');
const router = new Router();
const userLogController = require('../controllers/userLogController');

router.get('/', userLogController.getUserLogs);
router.post('/', userLogController.createUserLog);

module.exports = router;