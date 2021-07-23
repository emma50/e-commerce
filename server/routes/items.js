import express from 'express';

import itemController from '../controllers/items';
import auth from '../helpers/authentication/auth';
import allValidator from '../middleware/allValidator';
import validateItem from '../helpers/validation/items';
import validateUpdatedItem from '../helpers/validation/updateItem';
import itemObjects from '../middleware/itemObjects';
import isAdminCheck from '../middleware/isAdmin';

const router = express.Router();

const { verifyToken } = auth;
const {
  allItems,
  createItem,
  updateItem,
  deleteItem,
} = itemController;

router.get('', allItems);
router.post('',
  verifyToken,
  isAdminCheck,
  allValidator(validateItem),
  itemObjects.currentItem,
  createItem);
router.patch('/:itemid', verifyToken, isAdminCheck, allValidator(validateUpdatedItem), updateItem);
router.delete('/:itemid', verifyToken, isAdminCheck, deleteItem);

export default router;
