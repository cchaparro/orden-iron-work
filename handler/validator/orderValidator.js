const Joi = require("joi");

const getOrderByIdSchema = Joi.object({
  id: Joi.string().required(),
});

const saveOrderSchema = Joi.object({
  orderId: Joi.string().required(),
  custumer: Joi.string().required(),
  ordenName: Joi.string().required(),
  kindProduct: Joi.string().required(),
  desing: Joi.string().required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
});

module.exports = { getOrderByIdSchema, saveOrderSchema };
