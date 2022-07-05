const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.post('/', productController.create);
productRouter.get('/:id', productController.getById);
productRouter.put('/:id', productController.change);
productRouter.delete('/:id', productController.remove);

module.exports = productRouter;