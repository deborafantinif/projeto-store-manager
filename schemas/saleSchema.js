const Joi = require('joi');

const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().min(1).required().messages({
    'any.required': '400|"productId" is required',
    'number.min': '422|"productId" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '400|"quantity" is required',
    'number.min': '422|"quantity" must be greater than or equal to 1',
  }),
}));

module.exports = saleSchema;