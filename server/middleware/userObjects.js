import User from '../models/userModel';
import db from '../db/index';

export default class userObjects {
  static async currentUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await db.query(User.findOne({ email }));
      if (user) return res.status(409).json({ status: 409, message: 'The user with this email already exist' });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static newUser(hash, req) {
    const values = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hash,
    };
    return values;
  }
}
