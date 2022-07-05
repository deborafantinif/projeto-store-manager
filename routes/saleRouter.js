const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRouter = Router();

saleRouter.post('/', saleController.create);

module.exports = saleRouter;