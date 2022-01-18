import express from 'express';
import dotenv from 'dotenv';
import { login } from '../controllers/login';
import { user } from '../controllers/user';
import verify from '../middlewares/verify';

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

export default router;
