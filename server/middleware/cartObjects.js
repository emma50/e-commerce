import ItemModel from '../models/itemModel';
import CartModel from '../models/cartModel';
import db from '../db/index';

export default class cartObjects {
  static async newCart(req, itemId) {
    const { id } = req.user;
    const { quantity } = req.body;

    const item = await db.query(ItemModel.findById(itemId));
    const { title, price } = item;

    const createCart = CartModel.create({
      userId: id,
      items: [{
        productId: itemId,
        name: title,
        quantity,
        price,
      }],
      bill: quantity * price,
    });

    return createCart;
  }
}
