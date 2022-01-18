import { RequestHandler } from 'express';
import { veryToken } from '../utils/general';

const verify: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;

  if (token == '' || !token) throw new Error('token empty');
  if (!veryToken(token)) {
    res.clearCookie('token');
    throw new Error('invalid token');
  }

  next();
};

export default verify;
