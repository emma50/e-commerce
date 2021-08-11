import dotenv from 'dotenv';
import authTok from '../helpers/authentication/auth-token';
import userObjects from '../middleware/userObjects';
import db from '../db/index';
import UserModel from '../models/userModel';
import emailSender from '../middleware/nodemailer';
// import sendSMS from '../middleware/twilio';

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
      await emailSender(user.email, emailObj.subject, emailObj.text, next);
      // const twilioSMSInfo = await sendSMS(user.mobileNo, emailObj.text, next);

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
      const userToken = await authTok.generateSession(_id, email);
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

  static async userResetPasswordRequest(req, res, next) {
    try {
      const user = await db.query(UserModel.findOne({ email: req.body.email }));
      if (!user) { return res.status(400).json({ status: 400, message: 'Your email is incorrect' }); }
      const {
        _id, email, firstName,
      } = user;

      let token = await authTok.getToken(email);
      if (!token) {
        token = await authTok.generateSession(_id, email);
      }

      const url = process.env.NODE_ENV === 'test'
        ? `${req.protocol}://${req.host}:3001${req.baseUrl}/password-reset?token=${token}&id=${_id}`
        : `${req.protocol}://${req.host}:3000${req.baseUrl}/password-reset?token=${token}&id=${_id}`;

      const emailObj = {
        subject: 'Password reset',
        text: `Hi ${firstName}.\n You requested to reset your password.\n Please click the link below.\n ${url}`,
      };
      await emailSender(email, emailObj.subject, emailObj.text, next);
      return res.status(200).json({
        status: 200,
        message: 'Password reset link sent to your email account',
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }

  static async userResetPassword(req, res, next) {
    const { id, token } = req.query;
    try {
      const user = await db.query(UserModel.findById(id));
      if (!user || !token) { return res.status(400).json({ status: 400, message: 'Invalid link or expired' }); }
      const {
        _id, email,
      } = user;
      await authTok.generateSession(_id, email);

      const hash = authTok.hashPassword(req.body.password);
      const newHash = UserModel.updateOne({ _id }, { $set: { hash } }, { new: true });
      await db.query(newHash);
      await emailSender(email, 'Password reset', 'Password reset successfully', next);
      return res.status(200).json({
        status: 200,
        message: 'Password reset successfully',
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }
}

export default userController;
