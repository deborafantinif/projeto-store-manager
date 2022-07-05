const productModel = require('../models/productModel');
const schemaProduct = require('../schemas/productSchemas');
const validationStructure = require('../validations/validationStructure');

const validate = (value) => {
  const error = validationStructure(schemaProduct)(value);
  if (error) return error;
};

const productService = {
  getAll: async () => {
    const data = await productModel.getAll();
    return data;
  },

  getById: async (id) => {
    const data = await productModel.getById(id);
    if (!data) return { code: 404, data: { message: 'Product not found' } };
    return { code: 200, data };
  },

  create: async (name) => {
    const result = validate({ name });
    if (!result) { 
      const id = await productModel.create(name);
      return { code: 201, data: { id, name } };
    }
    const { code, message } = result;
    return { code, data: { message } };
  },

  change: async (name, id) => {
    const isFoundProduct = await productModel.getById(id);
    if (!isFoundProduct) return { code: 404, data: { message: 'Product not found' } };
    await productModel.change(name, id);
    return { code: 200, data: { id, name } };
  },
};

module.exports = productService;