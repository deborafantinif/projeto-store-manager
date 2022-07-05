const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRouter = Router();

saleRouter.post('/', saleController.create);
saleRouter.get('/', saleController.getAll);
saleRouter.get('/:id', saleController.getById);
saleRouter.delete('/:id', saleController.remove);
saleRouter.put('/:id', saleController.update);

module.exports = saleRouter;