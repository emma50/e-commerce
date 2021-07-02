import itemObjects from '../middleware/itemObjects';
import db from '../db/index';
import ItemModel from '../models/itemModel';

class itemController {
  // static async allItems(req, res) {
  //   try {
  //     const items = await db.query(ItemModel.find().sort({ date: -1 }));
  //     return res.status(200).json({ status: 200, data: items });
  //   } catch (error) { return res.status(500).json({ message: error }); }
  // }

  static async createItems(req, res) {
    const { firstName } = req.user;
    const values = itemObjects.newItem(req);

    try {
      const item = new ItemModel(values);
      const saveItem = item.save();
      const newItem = await db.query(saveItem);
      const {
        _id, title, description, category, price,
      } = newItem;

      return res.status(201).json({
        status: 201,
        message: `Hi, ${firstName} You have successfully created an item`,
        data: {
          id: _id,
          title,
          description,
          category,
          price,
        },
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }
}

export default itemController;
