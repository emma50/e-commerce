import fs from 'fs';
import itemObjects from '../middleware/itemObjects';
import db from '../db/index';
import ItemModel from '../models/itemModel';

class itemController {
  static async allItems(req, res) {
    try {
      const items = await db.query(ItemModel.find().sort({ date: -1 }));
      if (!items.length) return res.status(200).json({ status: 200, message: 'No item available' });
      return res.status(200).json({
        status: 200,
        data: items,
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }

  static async createItem(req, res) {
    const { firstName } = req.user;
    const values = itemObjects.newItem(req);
    values.item_img = req.file.filename;

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

  static async updateItem(req, res) {
    const itemId = req.params.itemid;

    try {
      await db.query(ItemModel.findByIdAndUpdate({ _id: itemId }, req.body));
      const item = await db.query(ItemModel.findOne({ _id: itemId }));
      if (itemId !== item.id) return res.status(400).json({ status: 400, message: 'The Item ID is invalid' });
      return res.status(200).json({
        status: 200,
        message: 'You successfully updated an item',
        data: item,
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }

  static async deleteItem(req, res) {
    const fsPromises = fs.promises;
    const itemId = req.params.itemid;

    try {
      const item = await db.query(ItemModel.findByIdAndDelete(itemId));
      const { _id } = item;
      const id = _id.toString();
      if (itemId !== id) return res.status(400).json({ status: 400, message: 'The Item ID is invalid' });
      await fsPromises.unlink(`./uploads/${item.item_img}`);
      return res.status(200).json({
        status: 200,
        message: `You successfully deleted the item with the ID: ${item.id}`,
        data: item,
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }
}

export default itemController;
