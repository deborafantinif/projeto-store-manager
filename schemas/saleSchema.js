const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.number().min(1).required().messages({
    'any.required': '404|"productId" is required',
    'string.min': '422|"productId" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '404|"quantity" is required',
    'string.min': '422|"quantity" must be greater than or equal to 1',
  }),
});

module.exports = saleSchema;