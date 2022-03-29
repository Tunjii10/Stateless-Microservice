import express from 'express';
import userLoginPost from '../Controllers/userController.js';

const router = express.Router();

router.post('/login', userLoginPost);

export default router;
