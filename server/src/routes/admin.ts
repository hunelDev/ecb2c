import express from 'express';
import dotenv from 'dotenv';
import { admin } from '../controllers/admin/admin';
import { login } from '../controllers/admin/login';
import { category } from '../controllers/admin/category';
import { image } from '../controllers/admin/image';
import adminVerify from '../middlewares/adminVerify';

dotenv.config();
const router = express.Router();
//router.post('/create', admin.create);
router.post('/login', login);
router.get('/categories/:id?', category.getAll);
router.put('/category', adminVerify, category.create);
router.post('/image', adminVerify, image.verify);
router.put('/image', adminVerify, image.create);
router.get('/image', adminVerify, image.destroy);
export default router;
