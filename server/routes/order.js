import express from 'express';

import orderController from '../controllers/order';
import auth from '../helpers/authentication/auth';

const router = express.Router();

const { verifyToken } = auth;
const {
  checkout,
  verifyPayment,
} = orderController;

router.post('', verifyToken, checkout);
router.get('/paystack/callback', verifyPayment);

export default router;
