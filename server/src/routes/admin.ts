import express from 'express';
import dotenv from 'dotenv';
import { admin } from '../controllers/admin/admin';
import { login } from '../controllers/admin/login';

dotenv.config();
const router = express.Router();
//router.post('/create', admin.create);
router.post('/login', login);
export default router;
