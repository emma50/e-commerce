import dotenv from 'dotenv';
import authTok from '../helpers/authentication/auth-token';
import userObjects from '../middleware/userObjects';
import db from '../db/index';
import UserModel from '../models/userModel';
import emailSender from '../middleware/nodemailer';
// import sendSMS from '../middleware/twilo';

dotenv.config();

class userController {
  static async userSignup(req, res, next) {
    const hash = authTok.hashPassword(req.body.password);
    const values = userObjects.newUser(hash, req);

    try {
      const user = new UserModel(values);
      const emailObj = {
        subject: 'E-commerce app',
        text: `Welcome ${user.firstName} to E-commerce app`,
      };
      if (user.email === process.env.ADMIN) user.isAdmin = true;

      const nodemailerInfo = await emailSender(user.email, emailObj.subject, emailObj.text, next);
      // const twilioSMSInfo = await sendSMS(user.mobileNo, emailObj.text, next);
      if (!nodemailerInfo.messageId) {
        res.status(400).json({ status: 400, message: 'Email connection failure' });
      }

      const saveUser = user.save();
      const newUser = await db.query(saveUser);
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

  static async userSignin(req, res) {
    try {
      const currentUser = await db.query(UserModel.findOne({ email: req.body.email }));
      const result = currentUser;
      if (!result) { return res.status(401).json({ status: 401, message: 'Your email is incorrect' }); }
      const validPassword = authTok.comparePassword(result.hash, req.body.password);
      if (!validPassword) { return res.status(401).json({ status: 401, message: 'Your password is incorrect' }); }
      const {
        _id, firstName, lastName, email,
      } = result;
      const userToken = await authTok.generateToken(_id, email);
      return res.status(200).json({
        status: 200,
        message: `Hi, ${firstName} You have successfully logged in`,
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
