import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let url;
let pool;
process.env.NODE_ENV = process.env.NODE_ENV || 'development' || 'production';

function dbPool() {
  if (process.env.NODE_ENV === 'test') {
    url = `mongodb://localhost:27017/${process.env.TEST_DATABASE}`;
    pool = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } else {
    url = `mongodb://localhost:27017/${process.env.DATABASE}`;
    pool = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
  return pool;
}

console.log(process.env.NODE_ENV, 'environment');

export default class Query {
  static async query(queryStrings) {
    let result = '';
    await dbPool();
    try {
      result = await queryStrings;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
