import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const url = `mongodb://localhost:27017/${process.env.DATABASE}`
mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true 
});

mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const connection = mongoose.connection

connection.once('open', _ => {
  console.log('Database connected:', url)
})

connection.on('error', err => {
  console.error('connection error:', err)
})

export default Schema
export { connection }
