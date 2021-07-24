import Joi from 'joi';

const validateUser = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).max(50).required(),
  email: Joi.string().min(4).max(50).required()
    .email(),
  mobileNo: Joi.string().min(6).max(20).required(),
  isAdmin: Joi.boolean(),
});

export default validateUser;
