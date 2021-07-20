import db from '../db/index';
import userModel from '../models/userModel';

class adminController {
  static async viewAllUsers(req, res) {
    try {
      const users = await db.query(userModel.find({}));
      return res.status(200).json({ status: 200, message: 'Received all Users', data: users });
    } catch (error) { return res.status(500).json(error); }
  }
}

export default adminController;
