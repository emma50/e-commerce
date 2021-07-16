import express from 'express';

import orderController from '../controllers/order';
import auth from '../helpers/authentication/auth';

const router = express.Router();

const { verifyToken } = auth;
const {
  checkout,
  verifyPayment,
  getOrder,
} = orderController;

router.post('', verifyToken, checkout);
router.get('/paystack/callback', verifyPayment);
router.get('', verifyToken, getOrder);

export default router;
