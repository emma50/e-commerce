import express from 'express';

import cartController from '../controllers/cart';
import auth from '../helpers/authentication/auth';
import allValidator from '../middleware/allValidator';
import validateQuantity from '../helpers/validation/itemQuantity';

const router = express.Router();

const { verifyToken } = auth;
const {
  addItemToCart,
  getItemFromCart,
} = cartController;

router.post('/:itemid', verifyToken, allValidator(validateQuantity), addItemToCart);
router.get('', verifyToken, getItemFromCart);

export default router;
