import express from 'express';

import userController from '../controllers/users';
import allValidator from '../middleware/allValidator';
import validateUser from '../helpers/validation/users';
import userObjects from '../middleware/userObjects';

const router = express.Router();

const { userSignup } = userController;

router.post('/signup', allValidator(validateUser), userObjects.currentUser, userSignup);

export default router;
