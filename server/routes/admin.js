import express from 'express';

import adminController from '../controllers/admin';
import auth from '../helpers/authentication/auth';
import isAdminCheck from '../middleware/isAdmin';

const router = express.Router();

const { verifyToken } = auth;
const { viewAllUsers } = adminController;

router.get('', verifyToken, isAdminCheck, viewAllUsers);
