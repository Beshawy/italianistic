const Joi = require("joi");


const profileSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should be at least 3 characters",
    "string.max": "Name should not exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10-15 digits",
      "string.empty": "Phone is required",
    }),
  address: Joi.string().max(200).allow("").messages({
    "string.max": "Address should not exceed 200 characters",
  }),
  profileImage: Joi.string().uri().allow("").messages({
    "string.uri": "Profile image must be a valid URL",
  }),
  password: Joi.string().min(6).max(50).allow("").messages({
    "string.min": "Password should be at least 6 characters",
    "string.max": "Password should not exceed 50 characters",
  }),
});

module.exports = { profileSchema };