import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default class paystackObjects {
  static async acceptPayment(body) {
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize ', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await paystackRes.json();
    return data;
  }

  static async verify(ref) {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await paystackRes.json();
    return data;
  }

  static async verifyPayment(ref, res, next) {
    try {
      const result = await this.verify(ref);
      if (!result) {
        return res.status(400).json({
          status: 400,
          message: 'Unable to verify payment',
        });
      }
      return next();
    } catch (error) { return next(error); }
  }
}
