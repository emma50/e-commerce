import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

// const url = `mongodb://localhost:27017/${process.env.DATABASE}`
const url = `mongodb://127.0.0.1:27017/${process.env.DATABASE}`
const pool = mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true 
});
// mongoose.connect(url, {
//   useNewUrlParser: true, 
//   useUnifiedTopology: true,
//   useCreateIndex: true 
// });

// mongoose.Promise = global.Promise

// const Schema = mongoose.Schema
// const connection = mongoose.connection

// connection.once('open', _ => {
//   console.log('Database connected:', url)
// })

// connection.on('error', err => {
//   console.error('connection error:', err)
// })

// export default Schema
// export { connection }



export default class Query {
  static async query(queryStrings) {
    let result = '';
    const client = await pool;
    try {
      result = await queryStrings;
    } catch (error) {
      console.log(error);
    } finally {
      console.log('E-COMMERCE APP')
    }
    return result;
  }
}