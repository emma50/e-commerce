import cartObjects from '../middleware/cartObjects';
import db from '../db/index';
import ItemModel from '../models/itemModel';
import CartModel from '../models/cartModel';

class cartController {
  static async addItemToCart(req, res) {
    const { id, firstName } = req.user;
    const itemId = req.params.itemid;
    const { quantity } = req.body;

    if (req.user.isAdmin === true) return res.status(401).json({ status: 401, message: 'You cannot add Item to cart as an Admin' });
    try {
      const cart = await db.query(CartModel.findOne({ userId: id }));
      const item = await db.query(ItemModel.findById(itemId));
      const { title, price } = item;
      if (!item) return res.status(404).json({ status: 404, message: 'The Item was not found' });
      if (!cart) {
        const newCart = await db.query(cartObjects.newCart(req));
        return res.status(201).json({
          status: 201,
          message: `Hi, ${firstName} You have successfully created a cart and added ${quantity} item(s) to it`,
          data: newCart,
        });
      }

      const itemIndex = cart.items.findIndex((p) => p.productId === itemId);

      if (itemIndex > -1) {
        const productItem = cart.items[itemIndex];
        productItem.quantity += Number(quantity);
        cart.bill = productItem.quantity * productItem.price;
        cart.items[itemIndex] = productItem;
        await db.query(cart.save());
      }

      if (itemIndex < 0) {
        cart.items.push({
          productId: itemId,
          name: title,
          quantity,
          price,
        });
        cart.bill += quantity * price;
        await db.query(cart.save());
      }

      return res.status(200).json({
        status: 200,
        message: `Hi, ${firstName} You have successfully added ${quantity} item(s) to cart`,
        data: cart,
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }
}

export default cartController;
