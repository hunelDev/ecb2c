import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { veryToken } from '../utils/general';

const adminVerify: RequestHandler = (req, res, next) => {
  const Authentication = req.get('SuperAuthentication');
  if (!Authentication) throw new Error('No Authentication');

  const token = Authentication!.slice(7);
  if (!token) throw new Error('token empty');

  const result = veryToken(token);
  if (!result) {
    res.clearCookie('token');
    res.locals.admin = null;
    throw new Error('invalid token');
  }

  const { id, email } = result as JwtPayload;
  res.locals.admin = { id, email };

  next();
};

export default adminVerify;
