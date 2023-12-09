const express = require('express');
const basketRouter = express.Router();
const cors = require('cors');
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware');

basketRouter.use(express.json());
basketRouter.use(cors());               
basketRouter.use(express.urlencoded({extended: true}));

basketRouter.get('/', typeController.getAll);

basketRouter.post('/', checkRole('admin'), typeController.create);

basketRouter.delete('/', async (req, res) => {
    console.log('delete');
})

module.exports = basketRouter;