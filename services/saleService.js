const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');

const verifyProduct = async (sales) => {
  const products = await Promise.all(sales.map(async (sale) => {
    const product = await productModel.getById(sale.productId);
    return product;
  }));
  return products.includes(undefined);
};

const saleService = {
  create: async (sales) => {
    const isProductNotFound = await verifyProduct(sales);
    if (isProductNotFound) return { code: 404, data: { message: 'Product not found' } };
    const id = await saleModel.create(sales);
    const data = {
      id,
      itemSold: sales,
    };
    return { code: 201, data };
  },

  getAll: async () => {
    const data = await saleModel.getAll();
    return data;
  },

  getById: async (id) => {
    const data = await saleModel.getById(id);
    if (!data.length) return { code: 404, data: { message: 'Sale not found' } };
    return { code: 200, data };
  },

  remove: async (id) => {
    const data = await saleModel.getById(id);
    if (!data.length) return { code: 404, data: { message: 'Sale not found' } };
    await saleModel.remove(id);
    return { code: 204, data: '' };
  },

  update: async (id, sales) => {
    const isFoundSales = await saleModel.getById(id);
    if (isFoundSales.length === 0) return { code: 404, data: { message: 'Sale not found' } };
    await saleModel.update(id, sales);
    const data = {
      saleId: id,
      itemsUpdated: sales,
    };
    return { code: 200, data };
  },
};

module.exports = saleService;