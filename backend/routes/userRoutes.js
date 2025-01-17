import express from 'express'
import { register, login, logout, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', register);
router.post('/login', login);
router.post('/logout', logout);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;