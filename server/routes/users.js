import express from 'express';

import userController from '../controllers/users';
import allValidator from '../middleware/allValidator';
import validateUser from '../helpers/validation/users';
import validateSignin from '../helpers/validation/signin';
import validateEmail from '../helpers/validation/resetPasswordReq';
import validatePassword from '../helpers/validation/resetPassword';
import userObjects from '../middleware/userObjects';

const router = express.Router();

const {
  userSignup,
  userSignin,
  userResetPasswordRequest,
  userResetPassword,
} = userController;

router.post('/signup', allValidator(validateUser), userObjects.currentUser, userSignup);
router.post('/signin', allValidator(validateSignin), userSignin);
router.post('/password-reset-request', allValidator(validateEmail), userResetPasswordRequest);
router.post('/password-reset', allValidator(validatePassword), userResetPassword);

export default router;
