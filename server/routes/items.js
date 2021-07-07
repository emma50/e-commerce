import express from 'express';

import itemController from '../controllers/items';
import auth from '../helpers/authentication/auth';
import allValidator from '../middleware/allValidator';
import validateItem from '../helpers/validation/items';
import itemObjects from '../middleware/itemObjects';
import isAdminCheck from '../middleware/isAdmin';

const router = express.Router();

const { verifyToken } = auth;
const {
  allItems,
  createItems,
} = itemController;

router.get('', allItems);
router.post('',
  verifyToken,
  isAdminCheck,
  allValidator(validateItem),
  itemObjects.currentItem,
  createItems);

export default router;
