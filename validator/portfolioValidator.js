const Joi = require("joi");

const languageSchema = Joi.object({
  en: Joi.string().min(3).required(),
  ar: Joi.string().min(3).required(),
  it: Joi.string().min(3).required(),
});

const createPortfolioSchema = Joi.object({
  title: languageSchema.required(),
  description: languageSchema.required(),
});

const updatePortfolioSchema = Joi.object({
  title: languageSchema,
  description: languageSchema,
});

module.exports = { createPortfolioSchema, updatePortfolioSchema };