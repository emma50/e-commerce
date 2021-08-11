import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import dotenv from 'dotenv';
import * as Promise from 'bluebird';

dotenv.config();
Promise.promisifyAll(redis);

const client = redis.createClient();

// client.on('error', (error) => {
//   console.error(error);
// });

const authToken = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id, email) {
    const token = jwt.sign({
      userId: id, uEmail: email,
    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '2 days' });

    return Promise.resolve(token);
  },

  async setToken(key, value) {
    await client.setAsync(key, value);
  },

  async getToken(key) {
    const val = await client.getAsync(key);
    return val;
  },

  async generateSession(id, uEmail) {
    const jwtoken = await this.generateToken(id, uEmail);
    await this.setToken(uEmail, jwtoken);
    const userToken = await this.getToken(uEmail);
    return userToken;
  },
};

export default authToken;
