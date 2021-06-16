import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const url = `mongodb://localhost:27017/${process.env.DATABASE}`
mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true 
});

export default mongoose.Schema

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})