const productService = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const data = await productService.getAll();
    return res.json(data);
  },

  getById: async (req, res) => {
    const { code, data } = await productService.getById(Number(req.params.id));
    return res.status(code).json(data);
  },

  create: async (req, res) => {
    const { code, data } = await productService.create(req.body.name);
    return res.status(code).json(data);
  },

  change: async (req, res) => {
    const { code, data } = await productService.change(req.body.name, Number(req.params.id));
    return res.status(code).json(data);
  },
};

module.exports = productController;