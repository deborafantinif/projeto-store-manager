const saleService = require('../services/saleService');

const saleController = {
  create: async (req, res) => {
    const { code, data } = await saleService.create(req.body);
    return res.status(code).json(data);
  },

  getAll: async (_req, res) => {
    const data = await saleService.getAll();
    return res.json(data);
  },
    
  getById: async (req, res) => {
    const { code, data } = await saleService.getById(Number(req.params.id));
    return res.status(code).json(data);
  },

  remove: async (req, res) => {
    const { code, data } = await saleService.remove(Number(req.params.id));
    return res.status(code).json(data);
  },

  update: async (req, res) => {
    const { code, data } = await saleService.update(Number(req.params.id), req.body);
    return res.status(code).json(data);
  },
};

module.exports = saleController;