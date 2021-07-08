import Joi from 'joi';

const updateItems = Joi.object({
  title: Joi.string().min(2).max(50),
  description: Joi.string().min(2).max(85),
  category: Joi.string().min(2).max(50),
  price: Joi.number().min(2).max(10000000000),
});

export default updateItems;
