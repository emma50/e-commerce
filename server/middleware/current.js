import User from '../models/userModel';
import Item from '../models/itemModel';
import db from '../db/index';

async function input(res, searcher, model, message) {
  const value = await db.query(model.findOne({ searcher }));
  if (value) return res.status(409).json({ status: 409, message });
}

async function find(res, email, title, next) {
  try {
    if (email) {
      input(res, email, User, 'The user with this email already exist');
      // const user = await db.query(User.findOne({ email }));
      // if (user) return res.status(409)
      // .json({ status: 409, message: 'The user with this email already exist' });
    }
    if (title) {
      input(res, title, Item, 'The item with this title already exist');
      // const item = await db.query(Item.findOne({ title }));
      // if (item) return res.status(409)
      // .json({ status: 409, message: 'The item with this title already exist' });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

async function current(req, res, next) {
  const { title, email } = req.body;

  find(res, email, title, next);
}

export default current;
