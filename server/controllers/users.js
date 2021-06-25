import User from '../models/userModel';
import authTok from '../helpers/authentication/auth-token';
import userObjects from '../middleware/userObjects';
import db from '../db/index';

class userController {
  static async userSignup(req, res) {
    const hash = authTok.hashPassword(req.body.password);
    const values = userObjects.newUser(hash, req);

    try {
      const newUser = await db.query(new User(values).save());
      const {
        _id, firstName, lastName, email,
      } = newUser;
      const userToken = await authTok.generateSession(_id, email);
      return res.status(201).json({
        status: 201,
        message: `Hi, ${firstName} You have successfully registered`,
        data: {
          token: userToken,
          id: _id,
          firstName,
          lastName,
          email,
        },
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }
}

export default userController;
