import mongoose from 'mongoose'
import Schema from '../db'

const itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  },
});

const item = mongoose.model('item', itemSchema);

export default item