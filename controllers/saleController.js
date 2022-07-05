const saleService = require('../services/saleService');

const saleController = {
  create: async (req, res) => {
    const { code, data } = await saleService.create(req.body);
    return res.status(code).json(data);
  },
};

module.exports = saleController;