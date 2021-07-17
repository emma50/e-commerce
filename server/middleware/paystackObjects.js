import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default class paystackObjects {
  static async acceptPayment(body) {
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize ', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        authorization: process.env.NODE_ENV === 'test' ? `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY_TEST}`
          : `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return paystackRes.json();
  }

  static async verify(ref) {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, {
      method: 'get',
      headers: {
        authorization: process.env.NODE_ENV === 'test' ? `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY_TEST}`
          : `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return paystackRes.json();
  }
}
