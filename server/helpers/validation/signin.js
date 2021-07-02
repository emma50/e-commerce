import Joi from 'joi';

const validateSignin = Joi.object({
  email: Joi.string().min(4).max(50).required()
    .email(),
  password: Joi.string().min(6).max(50).required(),
  isAdmin: Joi.boolean(),
});

export default validateSignin;
