import Joi from 'joi';

const validateItems = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(85).required(),
  category: Joi.string().min(2).max(50).required(),
  price: Joi.number().min(2).max(10000000000).required(),
});

export default validateItems;
