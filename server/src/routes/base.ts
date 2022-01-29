import express from 'express';
import dotenv from 'dotenv';
import { login } from '../controllers/login';
import { user } from '../controllers/user';
import verify from '../middlewares/verify';
import { address } from '../controllers/address';

dotenv.config();
const router = express.Router();

router.post('/register', user.create);
router.get('/', (req, res) => {
  res.send({
    jay: 'hoon',
  });
});
router.post('/login', login);
router.get('/user-check', verify, user.getShallow);
router.get('/user', verify, user.get);
router.patch('/user', verify, user.update);
router.post('/create-address', verify, address.create);

export default router;
