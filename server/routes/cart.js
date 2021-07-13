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
  deleteItemFromCart,
} = cartController;

router.post('/:itemid', verifyToken, allValidator(validateQuantity), addItemToCart);
router.get('', verifyToken, getItemFromCart);
router.delete('/:itemid', verifyToken, deleteItemFromCart);

export default router;
