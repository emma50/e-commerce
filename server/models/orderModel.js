import mongoose from 'mongoose'
import Schema from '../db'

const orderSchema = new Schema({
  userId: {
    type: String,
    ref: "user"
  },
  items: [{
    productId: {
      type: String,
      ref: "item"
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.']
    },
    price: Number
  }],
  bill: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  }
})

const order = mongoose.model('order', orderSchema);

export default order