const Joi = require("joi");

const loginSchema = Joi.object({
  login: Joi.string().alphanum().min(6).max(32).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = {
  loginSchema,
};
