import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../../models/userModel';
import db from '../../db/index';

dotenv.config();

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) { return res.status(401).send({ status: 401, message: 'Access denied. Your token is missing.' }); }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      const user = await db.query(userModel.findById(decoded.userId));
      if (!user) { res.status(401).json({ status: 401, message: 'Your token is invalid' }); }
      const { firstName, lastName, isAdmin } = user;
      req.user = {
        id: decoded.userId,
        email: decoded.uEmail,
        firstName,
        lastName,
        isAdmin,
      };
      return next();
    } catch (error) {
      res.status(401).json({ status: 401, message: 'Your token is invalid' });
      return res.status(500).json(error);
    }
  },
};

export default auth;
