import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb://localhost:27017/${process.env.DATABASE}`;
const pool = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

export default class Query {
  static async query(queryStrings) {
    let result = '';
    await pool;
    try {
      result = await queryStrings;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
