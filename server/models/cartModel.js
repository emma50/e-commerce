import mongoose from 'mongoose';
import Schema from '../db';

const cartSchema = new Schema({
  userId: {
    type: String,
    ref: 'user',
  },
  items: [{
    productId: {
      type: String,
      ref: 'item',
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
      default: 1,
    },
    price: Number,
  }],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});
const cart = mongoose.model('cart', cartSchema);

export default cart;
