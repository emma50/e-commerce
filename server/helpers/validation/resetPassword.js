import Joi from 'joi';

const validatePassword = Joi.object({
  password: Joi.string().min(6).max(50).required(),
});

export default validatePassword;
