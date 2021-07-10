import Joi from 'joi';

const validateItemQuantity = Joi.object({
  quantity: Joi.number().min(1).max(1000000).required(),
});

export default validateItemQuantity;
