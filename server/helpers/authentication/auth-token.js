import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const client = redis.createClient()

client.on("error", function(error) {
  console.error(error);
});

const auth_token = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  generateToken(id, email) {
    const token = jwt.sign({
      userId: id, uEmail: email,
    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '2 days'});

    return Promise.resolve(token);
  },

  setToken (key, value) {
    Promise.resolve(client.set(key, value))
  },

  async generateSession(id, uEmail) {
    const token = await this.generateToken(id, uEmail)
    await this.setToken('userToken', token)
    return token;
  }
};

export default auth_token;
