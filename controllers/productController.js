const productService = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const data = await productService.getAll();
    return res.json(data);
  },

  getById: async (req, res) => {
    const { code, data } = productService.getById(req.id);
    return res.status(code).json(data);
  },
};

module.exports = productController;