import User from '../models/userModel';
import Item from '../models/itemModel';
import db from '../db/index';

async function current(req, res, next) {
  const { title } = req.body;
  const { email } = req.body;

  try {
    if (email) {
      const user = await db.query(User.findOne({ email }));
      if (user) return res.status(409).json({ status: 409, message: 'The user with this email already exist' });
    }
    if (title) {
      const item = await db.query(Item.findOne({ title }));
      if (item) return res.status(409).json({ status: 409, message: 'The item with this title already exist' });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default current;
