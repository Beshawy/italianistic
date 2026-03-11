const Joi = require("joi");

const createPortfolioSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
});

const updatePortfolioSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().min(10),
});

module.exports = { createPortfolioSchema, updatePortfolioSchema };