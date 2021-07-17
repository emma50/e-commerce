import paystackObjects from '../middleware/paystackObjects';
import db from '../db/index';
import UserModel from '../models/userModel';
import OrderModel from '../models/orderModel';
import CartModel from '../models/cartModel';

class orderController {
  static async getOrder(req, res) {
    const { id, firstName, isAdmin } = req.user;

    if (isAdmin === true) return res.status(401).json({ status: 401, message: 'You cannot get an order as an Admin' });
    try {
      const sortOrder = OrderModel.find({ userId: id }).sort({ date: -1 });
      const order = await db.query(sortOrder);
      if (!order.length) {
        return res.status(404).json({
          status: 404,
          message: `Hi ${firstName} You have no order`,
        });
      }
      return res.status(200).json({
        status: 200,
        message: `Hi ${firstName} Here is your Order`,
        data: order,
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }

  static async checkout(req, res) {
    const {
      id,
      firstName,
      lastName,
      email,
      isAdmin,
    } = req.user;

    if (isAdmin === true) return res.status(401).json({ status: 401, message: 'You cannot create checkout as an Admin' });
    try {
      const cart = await db.query(CartModel.findOne({ userId: id }));

      if (cart) {
        const { bill } = cart;
        const value = {
          amount: bill,
          email,
          metadata: {
            fullName: `${firstName} ${lastName}`,
          },
        };

        const payment = await paystackObjects.acceptPayment(value);
        if (!payment) {
          return res.status(200).json({
            status: 200,
            message: `Unable to accept payment for ${firstName}`,
          });
        }
        console.log(payment);
        const { data } = payment;
        await res.redirect(data.authorization_url);
      }

      return res.status(404).json({
        status: 404,
        message: `Dear ${firstName}, You do not have item(s) in cart`,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async verifyPayment(req, res) {
    const ref = req.query.reference;

    try {
      const result = await paystackObjects.verify(ref);
      const { email } = result.data.customer;
      const user = await db.query(UserModel.findOne({ email }));
      const { _id, firstName } = user;
      const cart = await db.query(CartModel.findOne({ userId: _id }));

      const value = OrderModel.create({
        userId: _id,
        items: cart.items,
        bill: cart.bill,
      });

      const order = await db.query(value);
      await db.query(CartModel.findByIdAndDelete({ _id: cart.id }));

      return res.status(201).json({
        status: 201,
        message: `Hello ${firstName} You successfully created an order`,
        data: order,
      });
    } catch (error) { return res.status(500).json({ message: error }); }
  }
}

export default orderController;
