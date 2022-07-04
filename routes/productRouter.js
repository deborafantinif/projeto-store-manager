const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.post('/', productController.create);
productRouter.get('/:id', productController.getById);

module.exports = productRouter;