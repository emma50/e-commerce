import mongoose from 'mongoose';
import node_env from '../config/env';

node_env()

const db = mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true 
});

const Schema = db.schema

export default Schema