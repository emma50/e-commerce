import Joi from 'joi';

const validateEmail = Joi.object({
  email: Joi.string().min(4).max(50).required()
    .email(),
});

export default validateEmail;
