// import Item from '../models/itemModel';
// import db from '../db/index';
import current from './current';

export default class itemObjects {
  static async currentItem(req, res, next) {
    await current(req, res, next);

    // try {
    //   const { title } = req.body;
    //   const item = await db.query(Item.findOne({ title }));
    //   if (item) return res.status(409)
    // .json({ status: 409, message: 'The item with this title already exist' });
    //   return next();
    // } catch (error) {
    //   return next(error);
    // }
  }

  static newItem(req) {
    const values = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price).toFixed(2),
    };
    return values;
  }
}
